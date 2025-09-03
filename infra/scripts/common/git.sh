#!/usr/bin/env bash

# =============================================================================
# NestQL Common Git Utilities
# =============================================================================
# Shared Git-related functions used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/git.sh"
#
# FUNCTIONS:
#   get_git_commit_hash [SHORT] - Get current commit hash
#   get_current_branch - Get current git branch name
#   get_commit_message - Get current commit message
#   validate_git_status - Check git status and warn about uncommitted changes
# =============================================================================

# Source logging utilities
COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$COMMON_DIR/logging.sh"

# Get current git commit hash
# Usage: get_git_commit_hash [short]
get_git_commit_hash() {
	local short_flag="$1"
	
	if [[ "$short_flag" == "short" ]]; then
		git rev-parse --short HEAD 2>/dev/null || echo 'unknown'
	else
		git rev-parse HEAD 2>/dev/null || echo 'unknown'
	fi
}

# Get current git branch name
get_current_branch() {
	git branch --show-current 2>/dev/null || echo 'unknown'
}

# Get current commit message
get_commit_message() {
	git log -1 --pretty=format:'%s' 2>/dev/null || echo 'unknown'
}

# Validate git status and warn about uncommitted changes
# Usage: validate_git_status [AUTO_APPROVE]
validate_git_status() {
	local auto_approve="${1:-false}"
	
	log_info "Checking git status..."
	
	# Check git status for production safety
	if [[ -n "$(git status --porcelain 2>/dev/null || echo '')" ]]; then
		log_warn "Working directory has uncommitted changes"
		if [[ "$auto_approve" == false ]]; then
			read -p "Continue anyway? (y/N): " -n 1 -r
			echo
			if [[ ! $REPLY =~ ^[Yy]$ ]]; then
				log_info "Operation cancelled by user"
				exit 0
			fi
		else
			log_warn "Auto-approve enabled, continuing with uncommitted changes"
		fi
	fi
	
	# Check current branch
	local current_branch
	current_branch="$(get_current_branch)"
	if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
		log_warn "Operating on branch: $current_branch (not main/master)"
		if [[ "$auto_approve" == false ]]; then
			read -p "Continue anyway? (y/N): " -n 1 -r
			echo
			if [[ ! $REPLY =~ ^[Yy]$ ]]; then
				log_info "Operation cancelled by user"
				exit 0
			fi
		else
			log_warn "Auto-approve enabled, continuing from branch: $current_branch"
		fi
	fi
	
	log_success "Git status validated"
}
