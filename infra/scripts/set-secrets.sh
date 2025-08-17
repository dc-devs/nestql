#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Secrets Management Script (Rewritten)
# =============================================================================
# This script updates application secrets in AWS Secrets Manager.
# All secrets must be provided via environment variables for security.
#
# USAGE:
#   export NESTQL_APP_PASSWORD="your-nestql-db-password"
#   export MASTRA_APP_PASSWORD="your-mastra-db-password"
#   export SESSION_SECRET="your-session-secret"
#   export OPENAI_API_KEY="your-openai-api-key"
#   export ANTHROPIC_API_KEY="your-anthropic-api-key"
#   ./infra/scripts/set-secrets-new.sh
#
# REQUIREMENTS:
#   - AWS CLI configured with appropriate permissions
#   - Terraform applied (for infrastructure discovery)
#   - All required environment variables must be set
#   - Passwords must be at least 12 characters long
#   - API keys must be at least 20 characters long
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

# =============================================================================
# Configuration and Validation
# =============================================================================

# Get infrastructure details from Terraform
get_terraform_output() {
	local output_name="$1"
	terraform -chdir="${SCRIPT_DIR}/../terraform" output -raw "$output_name" 2>/dev/null || {
		log_error "Failed to get Terraform output: $output_name"
		log_error "Make sure you've run 'terraform apply' first"
		exit 1
	}
}

log_info "Getting infrastructure details from Terraform..."
readonly DB_ENDPOINT="$(get_terraform_output db_endpoint)"
readonly MASTRA_DB_ENDPOINT="$(get_terraform_output mastra_db_endpoint)"
readonly REDIS_ENDPOINT="$(get_terraform_output redis_endpoint)"

log_info "Infrastructure endpoints validated"

# =============================================================================
# Environment Variable Validation
# =============================================================================

validate_required_vars() {
	log_info "Validating required environment variables..."
	
	local errors=0
	
	# Database passwords
	if [[ -z "${NESTQL_APP_PASSWORD:-}" ]]; then
		log_error "NESTQL_APP_PASSWORD environment variable is required"
		log_error "Please set it with: export NESTQL_APP_PASSWORD='your-secure-password'"
		((errors++))
	elif [[ ${#NESTQL_APP_PASSWORD} -lt 12 ]]; then
		log_error "NESTQL_APP_PASSWORD must be at least 12 characters long"
		((errors++))
	fi
	
	if [[ -z "${MASTRA_APP_PASSWORD:-}" ]]; then
		log_error "MASTRA_APP_PASSWORD environment variable is required"
		log_error "Please set it with: export MASTRA_APP_PASSWORD='your-secure-password'"
		((errors++))
	elif [[ ${#MASTRA_APP_PASSWORD} -lt 12 ]]; then
		log_error "MASTRA_APP_PASSWORD must be at least 12 characters long"
		((errors++))
	fi
	
	# Session secret
	if [[ -z "${SESSION_SECRET:-}" ]]; then
		log_error "SESSION_SECRET environment variable is required"
		log_error "Please set it with: export SESSION_SECRET='your-session-secret'"
		((errors++))
	elif [[ ${#SESSION_SECRET} -lt 32 ]]; then
		log_error "SESSION_SECRET must be at least 32 characters long"
		((errors++))
	fi
	
	# API keys
	if [[ -z "${OPENAI_API_KEY:-}" ]]; then
		log_error "OPENAI_API_KEY environment variable is required"
		log_error "Please set it with: export OPENAI_API_KEY='your-openai-api-key'"
		((errors++))
	elif [[ ${#OPENAI_API_KEY} -lt 20 ]]; then
		log_error "OPENAI_API_KEY must be at least 20 characters long"
		((errors++))
	fi
	
	if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
		log_error "ANTHROPIC_API_KEY environment variable is required"
		log_error "Please set it with: export ANTHROPIC_API_KEY='your-anthropic-api-key'"
		((errors++))
	elif [[ ${#ANTHROPIC_API_KEY} -lt 20 ]]; then
		log_error "ANTHROPIC_API_KEY must be at least 20 characters long"
		((errors++))
	fi
	
	if [[ $errors -gt 0 ]]; then
		log_error "Found $errors validation error(s). Please fix them and try again."
		exit 1
	fi
	
	log_success "All environment variables validated successfully"
	log_info "Variable lengths: NESTQL_APP_PASSWORD=${#NESTQL_APP_PASSWORD}, MASTRA_APP_PASSWORD=${#MASTRA_APP_PASSWORD}, SESSION_SECRET=${#SESSION_SECRET}, OPENAI_API_KEY=${#OPENAI_API_KEY}, ANTHROPIC_API_KEY=${#ANTHROPIC_API_KEY}"
}

# =============================================================================
# Secret Construction
# =============================================================================

build_secrets() {
	log_info "Building secret values..."
	
	# Database connection strings
	readonly DATABASE_URL="postgresql://nestql_app:${NESTQL_APP_PASSWORD}@${DB_ENDPOINT}:5432/nestql?schema=public&sslmode=require&ssl=true"
	readonly MASTRA_DATABASE_URL="postgresql://mastra_app:${MASTRA_APP_PASSWORD}@${MASTRA_DB_ENDPOINT}:5432/mastra?schema=public&sslmode=require&ssl=true"
	readonly REDIS_URL="redis://${REDIS_ENDPOINT}:6379/0"
	
	log_success "Secret values constructed"
}

# =============================================================================
# AWS Secrets Manager Operations
# =============================================================================

update_secret() {
	local secret_name="$1"
	local secret_value="$2"
	local display_name="$3"
	
	log_info "Updating secret: $display_name"
	
	if aws secretsmanager put-secret-value \
		--region "$REGION" \
		--secret-id "${APP_NAME}/${secret_name}" \
		--secret-string "$secret_value" \
		--output text >/dev/null 2>&1; then
		log_success "Updated $display_name"
		return 0
	else
		log_error "Failed to update $display_name"
		return 1
	fi
}

verify_secret() {
	local secret_name="$1"
	local expected_value="$2"
	local display_name="$3"
	
	log_info "Verifying secret: $display_name"
	
	local stored_value
	stored_value="$(aws secretsmanager get-secret-value \
		--region "$REGION" \
		--secret-id "${APP_NAME}/${secret_name}" \
		--query SecretString \
		--output text 2>/dev/null || echo "")"
	
	if [[ "$stored_value" == "$expected_value" ]]; then
		log_success "✓ $display_name matches expected value"
		return 0
	else
		log_error "✗ $display_name does not match expected value"
		log_error "Expected length: ${#expected_value}, Stored length: ${#stored_value}"
		return 1
	fi
}

update_all_secrets() {
	log_info "Updating secrets in AWS Secrets Manager (region: $REGION)..."
	
	local update_errors=0
	
	# Update all secrets
	update_secret "DATABASE_URL" "$DATABASE_URL" "DATABASE_URL" || ((update_errors++))
	update_secret "MASTRA_DATABASE_URL" "$MASTRA_DATABASE_URL" "MASTRA_DATABASE_URL" || ((update_errors++))
	update_secret "REDIS_URL" "$REDIS_URL" "REDIS_URL" || ((update_errors++))
	update_secret "SESSION_SECRET" "$SESSION_SECRET" "SESSION_SECRET" || ((update_errors++))
	update_secret "OPENAI_API_KEY" "$OPENAI_API_KEY" "OPENAI_API_KEY" || ((update_errors++))
	update_secret "ANTHROPIC_API_KEY" "$ANTHROPIC_API_KEY" "ANTHROPIC_API_KEY" || ((update_errors++))
	
	if [[ $update_errors -gt 0 ]]; then
		log_error "$update_errors secret(s) failed to update"
		return 1
	fi
	
	log_success "All secrets updated successfully"
	return 0
}

verify_all_secrets() {
	log_info "Verifying secrets were stored correctly..."
	
	local verify_errors=0
	
	# Verify all secrets
	verify_secret "DATABASE_URL" "$DATABASE_URL" "DATABASE_URL" || ((verify_errors++))
	verify_secret "MASTRA_DATABASE_URL" "$MASTRA_DATABASE_URL" "MASTRA_DATABASE_URL" || ((verify_errors++))
	verify_secret "REDIS_URL" "$REDIS_URL" "REDIS_URL" || ((verify_errors++))
	verify_secret "SESSION_SECRET" "$SESSION_SECRET" "SESSION_SECRET" || ((verify_errors++))
	verify_secret "OPENAI_API_KEY" "$OPENAI_API_KEY" "OPENAI_API_KEY" || ((verify_errors++))
	verify_secret "ANTHROPIC_API_KEY" "$ANTHROPIC_API_KEY" "ANTHROPIC_API_KEY" || ((verify_errors++))
	
	if [[ $verify_errors -gt 0 ]]; then
		log_error "$verify_errors secret(s) failed verification"
		return 1
	fi
	
	log_success "All secrets verified successfully"
	return 0
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	log_info "Starting secrets update for $APP_NAME"
	log_info "Region: $REGION"
	log_info "Database: $DB_ENDPOINT"
	log_info "Mastra DB: $MASTRA_DB_ENDPOINT"
	log_info "Redis: $REDIS_ENDPOINT"
	
	# Validate environment variables
	validate_required_vars
	
	# Build secret values
	build_secrets
	
	# Update secrets in AWS
	if ! update_all_secrets; then
		log_error "Failed to update some secrets. Aborting."
		exit 1
	fi
	
	# Verify secrets were stored correctly
	if ! verify_all_secrets; then
		log_error "Some secrets failed verification. Check AWS console."
		exit 1
	fi
	
	log_success "All secrets updated and verified successfully!"
	log_info ""
	log_info "Next steps:"
	log_info "1. Deploy your application to use the new secrets"
	log_info "2. Test database connectivity"
	log_info ""
	log_info "To redeploy application:"
	echo "aws ecs update-service --region $REGION \\"
	echo "  --cluster \$(terraform -chdir=infra/terraform output -raw ecs_cluster_name) \\"
	echo "  --service \$(terraform -chdir=infra/terraform output -raw ecs_service_name) \\"
	echo "  --force-new-deployment"
	echo ""
	echo "# To scale service back up if needed:"
	echo "terraform -chdir=infra/terraform apply -var='ecs_desired_count=1'"
}

# =============================================================================
# Entry Point
# =============================================================================

# Validate prerequisites
if ! command -v aws >/dev/null 2>&1; then
	log_error "AWS CLI not found. Please install it first."
	exit 1
fi

if ! command -v terraform >/dev/null 2>&1; then
	log_error "Terraform not found. Please install it first."
	exit 1
fi

# Run main function
main "$@"
