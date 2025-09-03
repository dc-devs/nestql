#!/usr/bin/env bash

# =============================================================================
# NestQL ECS Deployment Script
# =============================================================================
# This script deploys the application to ECS and verifies the deployment.
# Infrastructure must be provisioned separately using Terraform.
#
# USAGE:
#   ./infra/scripts/deployment/deploy-ecs.sh [OPTIONS]
#
# OPTIONS:
#   --skip-verification Skip post-deployment verification
#   --timeout SECONDS   Deployment timeout in seconds (default: 600)
#   -h, --help         Show help message
#
# REQUIREMENTS:
#   - AWS CLI configured with ECS permissions
#   - Terraform already applied (infrastructure must exist)
#   - Application image already pushed to ECR
#
# WORKFLOW:
#   1. Run: ./infra/scripts/terraform-apply.sh (if infrastructure changed)
#   2. Run: ./infra/scripts/deployment/build-and-push.sh (to build new image)
#   3. Run: ./infra/scripts/deployment/deploy-ecs.sh (this script)
# =============================================================================

# Initialize common utilities
source "$(dirname "${BASH_SOURCE[0]}")/../common/init.sh"

# Default options
SKIP_VERIFICATION=false
TIMEOUT=600

# Parse command line arguments
parse_arguments() {
	while [[ $# -gt 0 ]]; do
		case $1 in
			--skip-verification)
				SKIP_VERIFICATION=true
				shift
				;;
			--timeout)
				TIMEOUT="$2"
				shift 2
				;;
			-h|--help)
				show_help
				exit 0
				;;
			*)
				log_error "Unknown option: $1"
				show_help
				exit 1
				;;
		esac
	done
}

show_help() {
	show_standard_help "ECS Deployment Script" \
		"This script deploys the application to ECS and verifies the deployment." \
		"./infra/scripts/deployment/deploy-ecs.sh [OPTIONS]" \
		"  --skip-verification  Skip post-deployment verification
  --timeout SECONDS    Deployment timeout in seconds (default: 600)
  -h, --help          Show this help message" \
		"  # Standard deployment
  ./infra/scripts/deployment/deploy-ecs.sh

  # Quick deployment without verification
  ./infra/scripts/deployment/deploy-ecs.sh --skip-verification

  # Deployment with custom timeout
  ./infra/scripts/deployment/deploy-ecs.sh --timeout 300

PREREQUISITES:
  1. Infrastructure must be provisioned: ./infra/scripts/terraform-apply.sh
  2. Application image must be built: ./infra/scripts/deployment/build-and-push.sh
  3. Then run this script to deploy to ECS"
}

# =============================================================================
# Validation and Setup
# =============================================================================

validate_prerequisites() {
	local commands=(
		"aws:AWS CLI"
		"terraform:Terraform"
		"curl:curl"
		"jq:jq"
	)
	validate_commands "${commands[@]}"
	validate_terraform_state
}

setup_variables() {
	log_info "Getting deployment configuration..."
	
	readonly CLUSTER_NAME="$(get_terraform_output ecs_cluster_name)"
	readonly SERVICE_NAME="$(get_terraform_output ecs_service_name)"
	readonly API_DOMAIN="$(get_terraform_output api_domain)"
	
	log_info "Cluster: $CLUSTER_NAME"
	log_info "Service: $SERVICE_NAME"
	log_info "API Domain: $API_DOMAIN"
	
	log_success "Deployment configuration loaded"
}

# =============================================================================
# ECS Deployment Operations
# =============================================================================

get_service_status() {
	get_ecs_service_status "$CLUSTER_NAME" "$SERVICE_NAME"
}

wait_for_deployment() {
	log_info "Starting ECS deployment..."
	
	# Trigger deployment
	local deployment_result
	deployment_result="$(aws ecs update-service \
		--region "$REGION" \
		--cluster "$CLUSTER_NAME" \
		--service "$SERVICE_NAME" \
		--force-new-deployment \
		--query 'service.deployments[0].id' \
		--output text 2>/dev/null || echo "")"
	
	if [[ -z "$deployment_result" ]]; then
		log_error "Failed to trigger ECS deployment"
		exit 1
	fi
	
	log_success "Deployment triggered successfully"
	log_info "Deployment ID: $deployment_result"
	
	# Wait for deployment to complete
	log_info "Waiting for deployment to complete (timeout: ${TIMEOUT}s)..."
	
	local start_time
	start_time="$(date +%s)"
	local dots=0
	
	while true; do
		local current_time
		current_time="$(date +%s)"
		local elapsed=$((current_time - start_time))
		
		if [[ $elapsed -gt $TIMEOUT ]]; then
			log_error "Deployment timeout after ${TIMEOUT} seconds"
			exit 1
		fi
		
		local status
		status="$(get_service_status)"
		local service_status
		service_status="$(echo "$status" | jq -r '.status // "unknown"')"
		local running_count
		running_count="$(echo "$status" | jq -r '.running // 0')"
		local desired_count
		desired_count="$(echo "$status" | jq -r '.desired // 0')"
		local deployment_status
		deployment_status="$(echo "$status" | jq -r '.deployments // "unknown"')"
		
		# Print progress dots
		printf "."
		((dots++))
		if [[ $dots -ge 60 ]]; then
			echo ""
			log_info "Status: $service_status, Running: $running_count/$desired_count, Deployment: $deployment_status"
			dots=0
		fi
		
		# Check if deployment is complete
		if [[ "$deployment_status" == "PRIMARY" && "$running_count" -eq "$desired_count" && "$desired_count" -gt 0 ]]; then
			echo ""
			log_success "Deployment completed successfully"
			log_info "Service status: $service_status"
			log_info "Running tasks: $running_count/$desired_count"
			break
		fi
		
		# Check for deployment failures (running count drops to 0 or service becomes unstable)
		if [[ "$running_count" -eq 0 && "$desired_count" -gt 0 ]]; then
			echo ""
			log_error "Deployment failed - no running tasks!"
			log_error "This usually indicates the new task definition failed health checks"
			log_info "Checking recent logs for errors..."
			show_recent_deployment_logs
			log_error "ECS may have automatically rolled back to the previous stable version"
			exit 1
		fi
		
		sleep 5
	done
}

# =============================================================================
# Verification
# =============================================================================

verify_deployment() {
	if [[ "$SKIP_VERIFICATION" == true ]]; then
		log_info "Skipping deployment verification (--skip-verification flag)"
		return 0
	fi
	
	log_info "Verifying deployment..."
	
	# Wait a moment for the service to be ready
	sleep 10
	
	# Test health endpoint
	local health_url="https://${API_DOMAIN}/ping"
	log_info "Testing health endpoint: $health_url"
	
	local response_code
	response_code="$(curl -s -o /dev/null -w "%{http_code}" "$health_url" || echo "000")"
	
	if [[ "$response_code" == "200" ]]; then
		log_success "Health check passed (HTTP $response_code)"
	else
		log_error "Health check failed (HTTP $response_code)"
		log_info "Checking recent logs for errors..."
		show_recent_deployment_logs
		exit 1
	fi
	
	# Test basic API functionality
	log_info "Testing basic API response..."
	local response_headers
	response_headers="$(curl -s -I "$health_url" || echo "")"
	
	if echo "$response_headers" | grep -q "HTTP/"; then
		log_success "API is responding correctly"
	else
		log_warn "API response headers look unusual"
		log_info "Response headers: $response_headers"
	fi
}

show_recent_deployment_logs() {
	show_recent_logs 5
}

show_deployment_summary() {
	log_info ""
	log_success "Deployment Summary"
	log_info "=================="
	log_info "Cluster: $CLUSTER_NAME"
	log_info "Service: $SERVICE_NAME"
	log_info "API URL: https://${API_DOMAIN}"
	log_info "Health Check: https://${API_DOMAIN}/ping"
	log_info ""
	log_info "Useful commands:"
	log_info "  View logs: aws logs tail '/ecs/${APP_NAME}' --since 10m --format short"
	log_info "  Service status: aws ecs describe-services --cluster '$CLUSTER_NAME' --services '$SERVICE_NAME'"
	log_info ""
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	# Parse command line arguments
	parse_arguments "$@"
	
	log_info "Starting ECS deployment for $APP_NAME"
	log_info "Region: $REGION"
	log_info "Timeout: ${TIMEOUT}s"
	
	validate_prerequisites
	setup_variables
	wait_for_deployment
	verify_deployment
	show_recent_deployment_logs
	show_deployment_summary
	
	log_success "ECS deployment completed successfully!"
}

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
