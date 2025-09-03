#!/usr/bin/env bash

# =============================================================================
# NestQL Common Terraform Utilities
# =============================================================================
# Shared Terraform-related functions used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/terraform.sh"
#
# FUNCTIONS:
#   get_terraform_output OUTPUT_NAME - Get Terraform output value
#   validate_terraform_state        - Check if Terraform state exists
# =============================================================================

# Source logging utilities
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$COMMON_DIR/logging.sh"

# Get Terraform output value
# Usage: get_terraform_output "output_name"
get_terraform_output() {
	local output_name="$1"
	local terraform_dir
	
	# Determine terraform directory based on script location
	if [[ -f "$COMMON_DIR/../terraform/providers.tf" ]]; then
		terraform_dir="$COMMON_DIR/../terraform"
	elif [[ -f "$COMMON_DIR/../../terraform/providers.tf" ]]; then
		terraform_dir="$COMMON_DIR/../../terraform"
	else
		log_error "Terraform directory not found. Please check your project structure."
		exit 1
	fi
	
	# Initialize Terraform if .terraform directory doesn't exist
	if [[ ! -d "$terraform_dir/.terraform" ]]; then
		log_info "Initializing Terraform..."
		terraform -chdir="$terraform_dir" init >/dev/null 2>&1 || {
			log_error "Failed to initialize Terraform"
			exit 1
		}
	fi
	
	terraform -chdir="$terraform_dir" output -raw "$output_name" 2>/dev/null || {
		log_error "Failed to get Terraform output: $output_name"
		log_error "Make sure you've run 'terraform apply' first"
		log_error "If using remote state, ensure proper authentication is configured"
		exit 1
	}
}

# Validate that Terraform state exists
validate_terraform_state() {
	log_info "Validating Terraform state..."
	
	local terraform_dir=""
	
	# Find terraform directory
	if [[ -f "$COMMON_DIR/../terraform/providers.tf" ]]; then
		terraform_dir="$COMMON_DIR/../terraform"
	elif [[ -f "$COMMON_DIR/../../terraform/providers.tf" ]]; then
		terraform_dir="$COMMON_DIR/../../terraform"
	else
		log_error "Terraform directory not found. Please check your project structure."
		exit 1
	fi
	
	log_success "Terraform directory found: $terraform_dir"
	
	# Always initialize in CI/CD environments (idempotent operation)
	if [[ ! -d "$terraform_dir/.terraform" ]] || [[ -n "${CI:-}" ]] || [[ -n "${GITHUB_ACTIONS:-}" ]]; then
		log_info "Initializing Terraform (required for remote state)..."
		terraform -chdir="$terraform_dir" init >/dev/null 2>&1 || {
			log_error "Failed to initialize Terraform"
			log_error "Please ensure:"
			log_error "  1. Backend configuration is correct in providers.tf"
			log_error "  2. AWS credentials are configured"
			log_error "  3. S3 bucket and DynamoDB table exist"
			log_error "  4. Network connectivity is available"
			exit 1
		}
		log_success "Terraform initialized successfully"
	fi
	
	# Validate we can read terraform state (works for both local and remote)
	log_info "Checking Terraform state accessibility..."
	if ! terraform -chdir="$terraform_dir" show >/dev/null 2>&1; then
		log_error "Cannot read Terraform state."
		log_error "This usually means:"
		log_error "  1. Infrastructure hasn't been provisioned yet (run 'terraform apply')"
		log_error "  2. Remote state backend is not accessible"
		log_error "  3. AWS credentials don't have access to the state backend"
		exit 1
	fi
	
	# Try to get outputs to verify state has resources
	log_info "Verifying Terraform outputs..."
	local state_check
	state_check="$(terraform -chdir="$terraform_dir" output -json 2>/dev/null || echo '{}')"
	
	if [[ "$state_check" == "{}" ]]; then
		log_warn "No Terraform outputs found."
		log_warn "This may indicate infrastructure hasn't been fully provisioned."
	else
		local output_count
		output_count="$(echo "$state_check" | jq 'keys | length' 2>/dev/null || echo "unknown")"
		log_success "Terraform state validated successfully ($output_count outputs found)"
	fi
	
	return 0
}
