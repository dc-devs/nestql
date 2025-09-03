#!/usr/bin/env bash

# =============================================================================
# NestQL Common Validation Utilities
# =============================================================================
# Shared validation functions used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/validation.sh"
#
# FUNCTIONS:
#   check_command COMMAND [DESCRIPTION] - Check if command exists
#   validate_commands COMMANDS_ARRAY    - Validate multiple commands exist
#   validate_environment_var VAR_NAME MIN_LENGTH [DESCRIPTION] - Validate env var
# =============================================================================

# Source logging utilities
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$COMMON_DIR/logging.sh"

# Check if a command exists
# Usage: check_command "aws" "AWS CLI for cloud operations"
check_command() {
	local command_name="$1"
	local description="${2:-$command_name}"
	
	if ! command -v "$command_name" >/dev/null 2>&1; then
		log_error "$description not found. Please install it first."
		return 1
	fi
	return 0
}

# Validate multiple commands exist
# Usage: validate_commands ("aws:AWS CLI" "docker:Docker" "terraform:Terraform")
validate_commands() {
	local commands=("$@")
	local errors=0
	
	log_info "Validating required commands..."
	
	for cmd_info in "${commands[@]}"; do
		local cmd_name="${cmd_info%%:*}"
		local cmd_desc="${cmd_info##*:}"
		
		if ! check_command "$cmd_name" "$cmd_desc"; then
			((errors++))
		fi
	done
	
	# Additional command-specific validations
	for cmd_info in "${commands[@]}"; do
		local cmd_name="${cmd_info%%:*}"
		
		case "$cmd_name" in
			docker)
				if ! docker buildx version >/dev/null 2>&1; then
					log_error "Docker buildx not available. Please update Docker."
					((errors++))
				fi
				;;
			git)
				if ! git rev-parse --git-dir >/dev/null 2>&1; then
					log_error "Not in a git repository."
					((errors++))
				fi
				;;
		esac
	done
	
	if [[ $errors -gt 0 ]]; then
		log_error "Found $errors prerequisite error(s). Please fix them and try again."
		exit 1
	fi
	
	log_success "All required commands validated"
}

# Validate environment variable exists and meets minimum length
# Usage: validate_environment_var "DATABASE_URL" 10 "Database connection string"
validate_environment_var() {
	local var_name="$1"
	local min_length="${2:-1}"
	local description="${3:-$var_name}"
	local var_value="${!var_name:-}"
	
	if [[ -z "$var_value" ]]; then
		log_error "Missing required environment variable: $var_name"
		log_error "  Description: $description"
		return 1
	fi
	
	if [[ ${#var_value} -lt $min_length ]]; then
		log_error "$var_name must be at least $min_length characters long"
		return 1
	fi
	
	return 0
}
