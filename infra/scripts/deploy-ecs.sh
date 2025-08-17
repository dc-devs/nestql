#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL ECS Deployment Script
# =============================================================================
# This script deploys the application to ECS and verifies the deployment.
#
# USAGE:
#   ./infra/scripts/deploy-ecs.sh [OPTIONS]
#
# OPTIONS:
#   --skip-terraform    Skip Terraform apply step
#   --skip-verification Skip post-deployment verification
#   --timeout SECONDS   Deployment timeout in seconds (default: 600)
#
# REQUIREMENTS:
#   - AWS CLI configured with ECS permissions
#   - Terraform applied (for service details)
#   - Application image already pushed to ECR
# =============================================================================

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly REGION="${AWS_REGION:-us-east-1}"
readonly APP_NAME="nestql"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }

# Default options
SKIP_TERRAFORM=false
SKIP_VERIFICATION=false
TIMEOUT=600

# Parse command line arguments
while [[ $# -gt 0 ]]; do
	case $1 in
		--skip-terraform)
			SKIP_TERRAFORM=true
			shift
			;;
		--skip-verification)
			SKIP_VERIFICATION=true
			shift
			;;
		--timeout)
			TIMEOUT="$2"
			shift 2
			;;
		*)
			log_error "Unknown option: $1"
			exit 1
			;;
	esac
done

# =============================================================================
# Validation and Setup
# =============================================================================

validate_prerequisites() {
	log_info "Validating prerequisites..."
	
	local errors=0
	
	# Check required commands
	if ! command -v aws >/dev/null 2>&1; then
		log_error "AWS CLI not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v terraform >/dev/null 2>&1 && [[ "$SKIP_TERRAFORM" == false ]]; then
		log_error "Terraform not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v curl >/dev/null 2>&1; then
		log_error "curl not found. Please install it first."
		((errors++))
	fi
	
	if [[ $errors -gt 0 ]]; then
		log_error "Found $errors prerequisite error(s). Please fix them and try again."
		exit 1
	fi
	
	log_success "All prerequisites validated"
}

get_terraform_output() {
	local output_name="$1"
	terraform -chdir="${SCRIPT_DIR}/../terraform" output -raw "$output_name" 2>/dev/null || {
		log_error "Failed to get Terraform output: $output_name"
		log_error "Make sure you've run 'terraform apply' first"
		exit 1
	}
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
# Deployment Operations
# =============================================================================

apply_terraform() {
	if [[ "$SKIP_TERRAFORM" == true ]]; then
		log_info "Skipping Terraform apply (--skip-terraform flag)"
		return 0
	fi
	
	log_info "Applying Terraform configuration..."
	
	# First try to apply - if it fails due to dependency lock issues, auto-fix
	if ! terraform -chdir="${SCRIPT_DIR}/../terraform" apply -auto-approve 2>&1; then
		log_warn "Terraform apply failed, checking for dependency lock issues..."
		
		# Try to detect if it's a lock file issue
		local plan_output
		plan_output="$(terraform -chdir="${SCRIPT_DIR}/../terraform" plan 2>&1 || echo "")"
		
		if echo "$plan_output" | grep -q "Inconsistent dependency lock file"; then
			log_info "Detected dependency lock file issue, running 'terraform init -upgrade'..."
			
			if terraform -chdir="${SCRIPT_DIR}/../terraform" init -upgrade; then
				log_info "Dependencies updated, retrying terraform apply..."
				
				if terraform -chdir="${SCRIPT_DIR}/../terraform" apply -auto-approve; then
					log_success "Terraform apply completed (after dependency update)"
					return 0
				else
					log_error "Terraform apply failed even after dependency update"
					exit 1
				fi
			else
				log_error "Failed to update Terraform dependencies"
				exit 1
			fi
		else
			log_error "Terraform apply failed for reasons other than dependency locks"
			exit 1
		fi
	else
		log_success "Terraform apply completed"
	fi
}

get_service_status() {
	aws ecs describe-services \
		--region "$REGION" \
		--cluster "$CLUSTER_NAME" \
		--services "$SERVICE_NAME" \
		--query 'services[0].{status:status,running:runningCount,pending:pendingCount,desired:desiredCount,deployments:deployments[0].status}' \
		--output json 2>/dev/null || echo '{}'
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
		show_recent_logs
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

show_recent_logs() {
	log_info "Showing recent application logs..."
	
	aws logs tail "/ecs/${APP_NAME}" \
		--region "$REGION" \
		--since 5m \
		--format short 2>/dev/null | tail -20 || {
		log_warn "Could not retrieve recent logs"
	}
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
	log_info "Starting ECS deployment for $APP_NAME"
	log_info "Region: $REGION"
	log_info "Timeout: ${TIMEOUT}s"
	
	validate_prerequisites
	setup_variables
	apply_terraform
	wait_for_deployment
	verify_deployment
	show_recent_logs
	show_deployment_summary
	
	log_success "ECS deployment completed successfully!"
}

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
