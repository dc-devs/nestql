#!/usr/bin/env bash

# =============================================================================
# NestQL Common AWS Utilities
# =============================================================================
# Shared AWS-related functions used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/aws.sh"
#
# FUNCTIONS:
#   validate_aws_credentials - Check if AWS credentials are configured
#   get_ecs_service_status CLUSTER_NAME SERVICE_NAME - Get ECS service status
#   show_recent_logs [MINUTES] - Show recent CloudWatch logs
# =============================================================================

# Source logging utilities and constants
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$COMMON_DIR/logging.sh"
source "$COMMON_DIR/constants.sh"

# Validate AWS credentials are configured
validate_aws_credentials() {
	log_info "Validating AWS credentials..."
	
	local errors=0
	local required_vars=(
		"AWS_ACCESS_KEY_ID:AWS access key for API operations"
		"AWS_SECRET_ACCESS_KEY:AWS secret access key for API operations"
	)
	
	# Check required variables
	for var_info in "${required_vars[@]}"; do
		local var_name="${var_info%%:*}"
		local var_desc="${var_info##*:}"
		
		if [[ -z "${!var_name:-}" ]]; then
			log_error "Missing required environment variable: $var_name"
			log_error "  Description: $var_desc"
			((errors++))
		fi
	done
	
	# Optional variables (just log their status)
	local optional_vars=(
		"AWS_REGION:AWS region (defaults to us-east-1)"
		"AWS_SESSION_TOKEN:AWS session token for temporary credentials"
	)
	
	for var_info in "${optional_vars[@]}"; do
		local var_name="${var_info%%:*}"
		local var_desc="${var_info##*:}"
		
		if [[ -n "${!var_name:-}" ]]; then
			log_info "Using $var_name: ${!var_name}"
		else
			log_info "Optional variable $var_name not set - $var_desc"
		fi
	done
	
	if [[ $errors -gt 0 ]]; then
		log_error ""
		log_error "Found $errors missing environment variable(s)."
		log_error ""
		log_error "To fix this, set the required environment variables:"
		log_error "  export AWS_ACCESS_KEY_ID=your-access-key"
		log_error "  export AWS_SECRET_ACCESS_KEY=your-secret-key"
		log_error ""
		log_error "Or configure AWS CLI with: aws configure"
		log_error ""
		exit 1
	fi
	
	log_success "AWS credentials validated"
}

# Get ECS service status
# Usage: get_ecs_service_status "cluster-name" "service-name"
get_ecs_service_status() {
	local cluster_name="$1"
	local service_name="$2"
	
	aws ecs describe-services \
		--region "$REGION" \
		--cluster "$cluster_name" \
		--services "$service_name" \
		--query 'services[0].{status:status,running:runningCount,pending:pendingCount,desired:desiredCount,primaryDeployment:deployments[?status==`PRIMARY`]|[0].status,activeDeployments:length(deployments[?status==`ACTIVE`||status==`PRIMARY`])}' \
		--output json 2>/dev/null || echo '{}'
}

# Show recent application logs
# Usage: show_recent_logs [minutes]
show_recent_logs() {
	local minutes="${1:-5}"
	
	log_info "Showing recent application logs (last ${minutes}m)..."
	
	aws logs tail "/ecs/${APP_NAME}" \
		--region "$REGION" \
		--since "${minutes}m" \
		--format short 2>/dev/null | tail -20 || {
		log_warn "Could not retrieve recent logs"
	}
}
