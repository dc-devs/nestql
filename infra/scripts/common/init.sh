#!/usr/bin/env bash

# =============================================================================
# NestQL Common Initialization
# =============================================================================
# Common initialization script that sets up shared variables and functions.
# This should be sourced by all deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/init.sh"
#
# PROVIDES:
#   - All logging functions (log_info, log_warn, log_error, log_success)
#   - All validation functions
#   - All terraform functions
#   - All AWS functions
#   - All git functions
#   - All constants (REGION, APP_NAME)
#   - SCRIPT_DIR variable pointing to the calling script's directory
# =============================================================================

# Determine the directory containing the common scripts
# This works regardless of where the calling script is located
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../common" && pwd)"

# Ensure we can find the common directory
if [[ ! -d "$COMMON_DIR" ]]; then
	echo "ERROR: Cannot find common scripts directory at: $COMMON_DIR" >&2
	exit 1
fi

# Set SCRIPT_DIR to the directory of the calling script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[1]}")" && pwd)"

# Source all common utilities
source "$COMMON_DIR/logging.sh"
source "$COMMON_DIR/constants.sh"
source "$COMMON_DIR/validation.sh"
source "$COMMON_DIR/terraform.sh"
source "$COMMON_DIR/aws.sh"
source "$COMMON_DIR/git.sh"
source "$COMMON_DIR/args.sh"

# Set bash error handling
set -euo pipefail
