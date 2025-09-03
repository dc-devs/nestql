#!/usr/bin/env bash

# =============================================================================
# NestQL Common Argument Parsing Utilities
# =============================================================================
# Shared argument parsing helper functions used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/args.sh"
#
# FUNCTIONS:
#   show_standard_help SCRIPT_NAME DESCRIPTION USAGE OPTIONS EXAMPLES - Show help
#   parse_common_flags "$@" - Parse common flags like --help, --auto-approve
# =============================================================================

# Source logging utilities
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$COMMON_DIR/logging.sh"

# Show standardized help message
# Usage: show_standard_help "script-name" "Description" "Usage line" "Options text" "Examples text"
show_standard_help() {
	local script_name="$1"
	local description="$2"
	local usage="$3"
	local options="$4"
	local examples="$5"
	
	cat << EOF
NestQL $script_name

$description

USAGE:
  $usage

OPTIONS:
$options

EXAMPLES:
$examples

EOF
}

# Parse common flags that appear across multiple scripts
# Returns: Sets global variables like SHOW_HELP, AUTO_APPROVE, etc.
# Usage: parse_common_flags "$@"
parse_common_flags() {
	# Initialize common flags
	SHOW_HELP=false
	AUTO_APPROVE=false
	
	while [[ $# -gt 0 ]]; do
		case $1 in
			-h|--help)
				SHOW_HELP=true
				return 0
				;;
			--auto-approve)
				AUTO_APPROVE=true
				shift
				;;
			*)
				# Return remaining arguments for script-specific parsing
				return 0
				;;
		esac
	done
}
