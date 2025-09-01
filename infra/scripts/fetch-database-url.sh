#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# Fetch DATABASE_URL from AWS Secrets Manager
# =============================================================================
# Simple helper script to fetch the production DATABASE_URL and export it
# for use with the migration script.
#
# USAGE:
#   source ./infra/scripts/fetch-database-url.sh
#   # or
#   eval $(./infra/scripts/fetch-database-url.sh)
#
# REQUIREMENTS:
#   - AWS CLI configured with appropriate permissions
#   - Access to the nestql/DATABASE_URL secret in us-east-1
# =============================================================================

readonly REGION="us-east-1"
readonly SECRET_NAME="nestql/DATABASE_URL"

# Colors for output
readonly BLUE='\033[0;34m'
readonly GREEN='\033[0;32m'
readonly RED='\033[0;31m'
readonly NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $*" >&2; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $*" >&2; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }

main() {
    log_info "Fetching DATABASE_URL from AWS Secrets Manager..."
    
    # Check if AWS CLI is available
    if ! command -v aws >/dev/null 2>&1; then
        log_error "AWS CLI not found. Please install it first."
        exit 1
    fi
    
    # Fetch the secret value
    local database_url
    if database_url="$(aws secretsmanager get-secret-value \
        --region "$REGION" \
        --secret-id "$SECRET_NAME" \
        --query 'SecretString' \
        --output text 2>/dev/null)"; then
        
        # Output the export command (for eval usage)
        echo "export DATABASE_URL='$database_url'"
        
        log_success "DATABASE_URL fetched successfully"
        log_info "You can now run: ./infra/scripts/migrate-database.sh --deploy"
    else
        log_error "Failed to fetch DATABASE_URL from AWS Secrets Manager"
        log_error "Make sure:"
        log_error "  1. You have AWS CLI configured"
        log_error "  2. You have permission to read the secret: $SECRET_NAME"
        log_error "  3. The secret exists in region: $REGION"
        exit 1
    fi
}

main "$@"
