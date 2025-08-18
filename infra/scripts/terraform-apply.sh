#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Terraform Apply Script
# =============================================================================
# Simple wrapper for terraform apply with proper error handling and logging.
#
# USAGE:
#   ./infra/scripts/terraform-apply.sh [TERRAFORM_OPTIONS]
#
# EXAMPLES:
#   ./infra/scripts/terraform-apply.sh
#   ./infra/scripts/terraform-apply.sh -auto-approve
#   ./infra/scripts/terraform-apply.sh -var="ecs_desired_count=2"
#   ./infra/scripts/terraform-apply.sh --auto-approve
# =============================================================================

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TERRAFORM_DIR="${SCRIPT_DIR}/../terraform"

# Colors for output
readonly BLUE='\033[0;34m'
readonly GREEN='\033[0;32m'
readonly RED='\033[0;31m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }

# Validate prerequisites
if ! command -v terraform >/dev/null 2>&1; then
	log_error "Terraform not found. Please install it first."
	exit 1
fi

if [[ ! -d "$TERRAFORM_DIR" ]]; then
	log_error "Terraform directory not found: $TERRAFORM_DIR"
	exit 1
fi

log_info "Running terraform apply in: $TERRAFORM_DIR"
log_info "Arguments: ${*:-none}"

if terraform -chdir="$TERRAFORM_DIR" apply "$@"; then
	log_success "Terraform apply completed successfully"
else
	log_error "Terraform apply failed"
	exit 1
fi