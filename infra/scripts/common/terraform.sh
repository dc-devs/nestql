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
	if [[ -f "$COMMON_DIR/../terraform/terraform.tfstate" ]]; then
		terraform_dir="$COMMON_DIR/../terraform"
	elif [[ -f "$COMMON_DIR/../../terraform/terraform.tfstate" ]]; then
		terraform_dir="$COMMON_DIR/../../terraform"
	else
		log_error "Terraform state file not found. Run 'terraform apply' first."
		exit 1
	fi
	
	terraform -chdir="$terraform_dir" output -raw "$output_name" 2>/dev/null || {
		log_error "Failed to get Terraform output: $output_name"
		log_error "Make sure you've run 'terraform apply' first"
		exit 1
	}
}

# Validate that Terraform state exists
validate_terraform_state() {
	log_info "Validating Terraform state..."
	
	local terraform_dir=""
	local state_file=""
	
	# Determine terraform directory and check for state
	if [[ -f "$COMMON_DIR/../terraform/terraform.tfstate" ]]; then
		terraform_dir="$COMMON_DIR/../terraform"
		state_file="$terraform_dir/terraform.tfstate"
	elif [[ -f "$COMMON_DIR/../../terraform/terraform.tfstate" ]]; then
		terraform_dir="$COMMON_DIR/../../terraform"
		state_file="$terraform_dir/terraform.tfstate"
	else
		log_error "Terraform state file not found."
		log_error "Searched locations:"
		log_error "  - $COMMON_DIR/../terraform/terraform.tfstate"
		log_error "  - $COMMON_DIR/../../terraform/terraform.tfstate"
		log_error ""
		log_error "Please ensure:"
		log_error "  1. Infrastructure has been provisioned with 'terraform apply'"
		log_error "  2. Terraform state file is accessible"
		log_error "  3. Working directory is correct"
		log_error ""
		log_error "If using remote state backend, ensure:"
		log_error "  1. Backend is configured in providers.tf"
		log_error "  2. Authentication is set up for the backend"
		log_error "  3. 'terraform init' has been run"
		exit 1
	fi
	
	# Validate state file is not empty and contains resources
	if [[ ! -s "$state_file" ]]; then
		log_error "Terraform state file exists but is empty: $state_file"
		log_error "This usually means infrastructure hasn't been provisioned yet."
		log_error "Please run 'terraform apply' to create infrastructure."
		exit 1
	fi
	
	# Check if state contains any resources
	local resource_count
	resource_count="$(jq -r '.resources | length' "$state_file" 2>/dev/null || echo "0")"
	
	if [[ "$resource_count" -eq 0 ]]; then
		log_warn "Terraform state file contains no resources."
		log_warn "This may indicate infrastructure hasn't been fully provisioned."
	else
		log_success "Terraform state found with $resource_count resource(s)"
	fi
	
	# Validate we can actually read terraform outputs
	if ! terraform -chdir="$terraform_dir" version >/dev/null 2>&1; then
		log_error "Terraform binary not found or not working."
		log_error "Please ensure Terraform is installed and accessible."
		exit 1
	fi
	
	log_success "Terraform state validation completed"
	return 0
}
