#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Database Reset Script
# =============================================================================
# This script resets the database by removing all migrations and data,
# then recreates the schema and optionally seeds the database.
#
# ⚠️  WARNING: This is a DESTRUCTIVE operation that will DELETE ALL DATA! ⚠️
#
# USAGE:
#   ./infra/scripts/database/database-reset.sh [OPTIONS]
#
# OPTIONS:
#   --auto-approve        Skip confirmation prompts (DANGEROUS)
#   --skip-seed          Skip database seeding after reset
#   --local              Run reset via ECS task (for local development)
#   --timeout SECONDS    Operation timeout in seconds (default: 300)
#   -h, --help          Show help message
#
# ENVIRONMENT VARIABLES:
#   REQUIRED:
#     DATABASE_URL            Direct database connection string
#
#   FOR LOCAL MODE:
#     AWS_ACCESS_KEY_ID       AWS access key for ECS operations
#     AWS_SECRET_ACCESS_KEY   AWS secret key for ECS operations
#
# REQUIREMENTS:
#   - Node.js runtime with pnpm
#   - Prisma schema and migrations directory
#   - AWS CLI configured (for local mode)
#
# WORKFLOW:
#   This script performs database reset operations:
#   1. Reset the database (deletes all data and schema)
#   2. Apply all migrations from the built image
#   3. Seed the database with initial data (optional)
# =============================================================================

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
readonly REGION="us-east-1"
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

# Default options
AUTO_APPROVE=false
SKIP_SEED=false
LOCAL_MODE=false
TIMEOUT=300

# Parse command line arguments
parse_arguments() {
	while [[ $# -gt 0 ]]; do
		case $1 in
			--auto-approve)
				AUTO_APPROVE=true
				shift
				;;
			--skip-seed)
				SKIP_SEED=true
				shift
				;;
			--local)
				LOCAL_MODE=true
				shift
				;;
			--timeout)
				TIMEOUT="$2"
				shift 2
				;;
			-h|--help)
				show_help
				exit 0
				;;
			*)
				log_error "Unknown option: $1"
				show_help
				exit 1
				;;
		esac
	done
}

show_help() {
	cat << 'EOF'
NestQL Database Reset Script

⚠️  WARNING: This is a DESTRUCTIVE operation that will DELETE ALL DATA! ⚠️

USAGE:
  ./infra/scripts/database/database-reset.sh [OPTIONS]

OPTIONS:
  --auto-approve     Skip confirmation prompts (DANGEROUS)
  --skip-seed       Skip database seeding after reset
  --local           Run reset via ECS task (for local development)
  --timeout SECONDS Operation timeout in seconds (default: 300)
  -h, --help       Show this help message

EXAMPLES:
  # Interactive reset with confirmation
  ./infra/scripts/database/database-reset.sh

  # Reset without seeding
  ./infra/scripts/database/database-reset.sh --skip-seed

  # Automated reset (no prompts - DANGEROUS)
  ./infra/scripts/database/database-reset.sh --auto-approve

  # Reset via ECS task (for local dev with network restrictions)
  ./infra/scripts/database/database-reset.sh --local

WHAT THIS SCRIPT DOES:
  1. Resets the database (deletes all data and schema)
  2. Applies all migrations from the Docker image
  3. Recreates the complete schema
  4. Seeds the database (unless --skip-seed)

ENVIRONMENT VARIABLES:
  DATABASE_URL              - Required: Database connection string
  AWS_ACCESS_KEY_ID         - Required for --local mode
  AWS_SECRET_ACCESS_KEY     - Required for --local mode

EOF
}

# =============================================================================
# Validation and Setup
# =============================================================================

validate_prerequisites() {
	log_info "Validating prerequisites..."
	
	local errors=0
	
	# Check required commands
	if ! command -v node >/dev/null 2>&1; then
		log_error "Node.js runtime not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v pnpm >/dev/null 2>&1; then
		log_error "pnpm not found. Please install it first."
		((errors++))
	fi
	
	if [[ "$LOCAL_MODE" == "true" ]] && ! command -v aws >/dev/null 2>&1; then
		log_error "AWS CLI not found but required for local mode (ECS operations)."
		((errors++))
	fi
	
	# Check if we're in the right directory
	if [[ ! -f "$PROJECT_ROOT/prisma/schema.prisma" ]]; then
		log_error "Prisma schema not found. Are you in the right directory?"
		((errors++))
	fi
	
	# Check if package.json has required scripts
	if [[ ! -f "$PROJECT_ROOT/package.json" ]]; then
		log_error "package.json not found in project root."
		((errors++))
	fi
	
	if [[ $errors -gt 0 ]]; then
		log_error "Found $errors prerequisite error(s). Please fix them and try again."
		exit 1
	fi
	
	log_success "All prerequisites validated"
}

validate_environment_variables() {
	log_info "Validating environment variables..."
	
	local errors=0
	
	# DATABASE_URL is mandatory
	if [[ -z "${DATABASE_URL:-}" ]]; then
		log_error "Missing required environment variable: DATABASE_URL"
		log_error "  Description: Direct database connection string"
		((errors++))
	fi
	
	# For local mode, we need AWS credentials for ECS operations
	if [[ "$LOCAL_MODE" == "true" ]]; then
		if [[ -z "${AWS_ACCESS_KEY_ID:-}" ]]; then
			log_error "Missing required environment variable: AWS_ACCESS_KEY_ID"
			log_error "  Description: AWS access key for ECS operations"
			((errors++))
		fi
		
		if [[ -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
			log_error "Missing required environment variable: AWS_SECRET_ACCESS_KEY"
			log_error "  Description: AWS secret key for ECS operations"
			((errors++))
		fi
	fi
	
	# Validate DATABASE_URL format if provided
	if [[ -n "${DATABASE_URL:-}" ]] && [[ ! "${DATABASE_URL}" =~ ^postgresql:// ]]; then
		log_error "Invalid DATABASE_URL format: must start with 'postgresql://'"
		((errors++))
	fi
	
	if [[ $errors -gt 0 ]]; then
		log_error ""
		log_error "Environment variable validation failed with $errors error(s)."
		log_error ""
		log_error "Required environment variables:"
		log_error "  DATABASE_URL         - Direct database connection string"
		if [[ "$LOCAL_MODE" == "true" ]]; then
			log_error "  AWS_ACCESS_KEY_ID    - AWS access key for ECS operations"
			log_error "  AWS_SECRET_ACCESS_KEY - AWS secret key for ECS operations"
		fi
		log_error ""
		log_error "Example usage:"
		log_error "  export DATABASE_URL=postgresql://user:pass@host:5432/db"
		if [[ "$LOCAL_MODE" == "true" ]]; then
			log_error "  export AWS_ACCESS_KEY_ID=your-access-key"
			log_error "  export AWS_SECRET_ACCESS_KEY=your-secret-key"
		fi
		log_error "  $0 --auto-approve"
		log_error ""
		exit 1
	fi
	
	log_success "Environment variables validated"
}

get_terraform_output() {
	local output_name="$1"
	if [[ -f "$SCRIPT_DIR/../../terraform/terraform.tfstate" ]]; then
		terraform -chdir="$SCRIPT_DIR/../../terraform" output -raw "$output_name" 2>/dev/null || {
			log_error "Failed to get Terraform output: $output_name"
			log_error "Make sure you've run 'terraform apply' first"
			exit 1
		}
	else
		log_error "Terraform state file not found. Run 'terraform apply' first."
		exit 1
	fi
}

show_reset_plan() {
	log_warn ""
	log_warn "⚠️  DATABASE RESET PLAN ⚠️"
	log_warn "=========================="
	log_warn "Database: ${DATABASE_URL%%\?*}"  # Hide query params for security
	log_warn "Mode: $([[ "$LOCAL_MODE" == "true" ]] && echo "Local (ECS)" || echo "Direct")"
	log_warn "Skip seed: $SKIP_SEED"
	log_warn "Auto-approve: $AUTO_APPROVE"
	log_warn ""
	log_warn "THIS WILL:"
	log_warn "  1. DROP and recreate the database"
	log_warn "  2. DELETE ALL EXISTING DATA"
	log_warn "  3. Apply all migrations from the image"
	log_warn "  4. Recreate the schema"
	if [[ "$SKIP_SEED" == "false" ]]; then
		log_warn "  5. Seed the database with initial data"
	fi
	log_warn ""
	log_warn "⚠️  THIS CANNOT BE UNDONE! ⚠️"
	log_warn "=========================="
	log_warn ""
	
	if [[ "$AUTO_APPROVE" == false ]]; then
		read -p "Type 'yes' to confirm this destructive operation: " -r
		if [[ ! $REPLY == "yes" ]]; then
			log_info "Database reset cancelled by user"
			exit 0
		fi
	else
		log_warn "Auto-approve enabled, proceeding with reset immediately"
	fi
}

# =============================================================================
# Local Mode (ECS Task Execution)
# =============================================================================

run_via_ecs_task() {
	log_info "Running database reset via ECS task..."
	
	local cluster_name
	local task_definition_arn
	local subnet_id
	local security_group_id
	
	# Get ECS configuration from Terraform
	cluster_name="$(get_terraform_output ecs_cluster_name)"
	task_definition_arn="$(get_terraform_output ecs_task_definition_arn)"
	
	# Get VPC configuration
	subnet_id="$(aws ec2 describe-subnets \
		--region "$REGION" \
		--filters "Name=tag:Name,Values=nestql-private-*" \
		--query 'Subnets[0].SubnetId' \
		--output text 2>/dev/null)" || {
		log_error "Failed to find private subnet"
		exit 1
	}
	
	security_group_id="$(get_terraform_output ecs_security_group_id)"
	
	# Build the reset command for production (no migration file deletion)
	local reset_cmd="cd /usr/src/app && pnpm run prisma:migrate:reset --force && pnpm exec prisma migrate deploy"
	
	# Add seeding if not skipped
	if [[ "$SKIP_SEED" == "false" ]]; then
		reset_cmd="$reset_cmd && pnpm run prisma:seed"
	fi
	
	log_info "Command to run: $reset_cmd"
	log_info "Cluster: $cluster_name"
	log_info "Task Definition: $task_definition_arn"
	log_info "Subnet: $subnet_id"
	
	# Run the ECS task
	local task_arn
	task_arn="$(aws ecs run-task \
		--region "$REGION" \
		--cluster "$cluster_name" \
		--task-definition "$task_definition_arn" \
		--launch-type FARGATE \
		--network-configuration "awsvpcConfiguration={subnets=[$subnet_id],securityGroups=[$security_group_id],assignPublicIp=DISABLED}" \
		--overrides "{
			\"containerOverrides\": [{
				\"name\": \"nestql\",
				\"command\": [\"sh\", \"-c\", \"$reset_cmd\"]
			}]
		}" \
		--query 'tasks[0].taskArn' \
		--output text 2>/dev/null)" || {
		log_error "Failed to start ECS task"
		exit 1
	}
	
	log_success "Database reset task started: $task_arn"
	
	# Wait for task completion
	log_info "Waiting for reset task to complete..."
	
	local start_time
	start_time="$(date +%s)"
	
	while true; do
		local current_time
		current_time="$(date +%s)"
		local elapsed=$((current_time - start_time))
		
		if [[ $elapsed -gt $TIMEOUT ]]; then
			log_error "Reset task timeout after ${TIMEOUT} seconds"
			exit 1
		fi
		
		# Check task status
		local task_status
		task_status="$(aws ecs describe-tasks \
			--region "$REGION" \
			--cluster "$cluster_name" \
			--tasks "$task_arn" \
			--query 'tasks[0].lastStatus' \
			--output text 2>/dev/null || echo "UNKNOWN")"
		
		if [[ "$task_status" == "STOPPED" ]]; then
			# Check exit code
			local exit_code
			exit_code="$(aws ecs describe-tasks \
				--region "$REGION" \
				--cluster "$cluster_name" \
				--tasks "$task_arn" \
				--query 'tasks[0].containers[0].exitCode' \
				--output text 2>/dev/null || echo "1")"
			
			if [[ "$exit_code" == "0" ]]; then
				log_success "Database reset task completed successfully"
				break
			else
				log_error "Database reset task failed with exit code: $exit_code"
				
				# Show logs
				log_info "Recent task logs:"
				aws logs tail "/ecs/${APP_NAME}" \
					--region "$REGION" \
					--since 10m \
					--format short 2>/dev/null | tail -20 || {
					log_warn "Could not retrieve task logs"
				}
				exit 1
			fi
		fi
		
		printf "."
		sleep 5
	done
	
	# Show logs
	log_info "Reset task logs:"
	aws logs tail "/ecs/${APP_NAME}" \
		--region "$REGION" \
		--since 10m \
		--format short 2>/dev/null | tail -30 || {
		log_warn "Could not retrieve task logs"
	}
}

# =============================================================================
# Direct Reset Operations
# =============================================================================

check_database_connection() {
	log_info "Testing database connection..."
	
	cd "$PROJECT_ROOT"
	
	# Test connection using Prisma
	if timeout "$TIMEOUT" node -e "
		const { PrismaClient } = require('@prisma/client');
		const prisma = new PrismaClient();
		prisma.\$connect().then(() => {
			console.log('Database connection successful');
			return prisma.\$disconnect();
		}).catch((err) => {
			console.error('Database connection failed:', err);
			process.exit(1);
		});
	" >/dev/null 2>&1; then
		log_success "Database connection verified"
	else
		log_error "Failed to connect to database"
		log_error "Please check your DATABASE_URL and network connectivity"
		exit 1
	fi
}



reset_database() {
	log_info "Resetting database (this will delete all data)..."
	
	cd "$PROJECT_ROOT"
	
	# Run prisma migrate reset with force flag
	pnpm run prisma:migrate:reset --force
	log_success "Database reset completed"
}

apply_migrations() {
	log_info "Applying all migrations from the image..."
	
	cd "$PROJECT_ROOT"
	
	# Deploy all existing migrations (production mode)
	pnpm exec prisma migrate deploy
	log_success "All migrations applied successfully"
}

run_seed() {
	if [[ "$SKIP_SEED" == "true" ]]; then
		log_info "Skipping database seeding (--skip-seed flag)"
		return 0
	fi
	
	log_info "Running database seeding..."
	
	cd "$PROJECT_ROOT"
	
	if [[ -f "prisma/seed.ts" ]] || [[ -f "prisma/seed.js" ]]; then
		pnpm run prisma:seed
		log_success "Database seeding completed"
	else
		log_warn "No seed file found (prisma/seed.ts or prisma/seed.js)"
	fi
}

generate_prisma_client() {
	log_info "Generating Prisma client..."
	
	cd "$PROJECT_ROOT"
	
	pnpm exec prisma generate
	log_success "Prisma client generated"
}

show_summary() {
	log_info ""
	log_success "Database Reset Summary"
	log_info "======================"
	log_info "Database: Main RDS (nestql)"
	log_info "Mode: $([[ "$LOCAL_MODE" == "true" ]] && echo "Local (ECS)" || echo "Direct")"
	log_info "Seeded: $([[ "$SKIP_SEED" == "true" ]] && echo "No" || echo "Yes")"
	log_info ""
	log_info "What was done:"
	log_info "  ✓ Reset database (deleted all data)"
	log_info "  ✓ Applied all migrations from image"
	log_info "  ✓ Recreated schema"
	if [[ "$SKIP_SEED" == "false" ]]; then
		log_info "  ✓ Seeded database with initial data"
	fi
	log_info ""
	log_info "Useful commands:"
	log_info "  Check status: pnpm exec prisma migrate status"
	log_info "  View data: pnpm exec prisma studio"
	log_info "  Create migration: pnpm run prisma:migrate:dev --name <name>"
	log_info ""
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	# Parse command line arguments
	parse_arguments "$@"
	
	log_info "Starting NestQL database reset"
	log_info "Mode: $([[ "$LOCAL_MODE" == "true" ]] && echo "Local (ECS)" || echo "Direct")"
	log_info "Region: $REGION"
	
	validate_prerequisites
	validate_environment_variables
	show_reset_plan
	
	# Handle local mode (ECS task execution)
	if [[ "$LOCAL_MODE" == "true" ]]; then
		log_info "Running reset via ECS task (bypasses local network limitations)"
		run_via_ecs_task
		show_summary
		log_success "Database reset completed successfully!"
		return 0
	fi
	
	# Standard mode (direct connection)
	check_database_connection
	reset_database
	apply_migrations
	generate_prisma_client
	run_seed
	
	show_summary
	log_success "Database reset completed successfully!"
}

# =============================================================================
# Entry Point
# =============================================================================

# Ensure we're in the project root for consistent behavior
cd "$PROJECT_ROOT"

main "$@"
