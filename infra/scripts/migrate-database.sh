#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Database Migration Script
# =============================================================================
# This script runs Prisma migrations against the main RDS database.
# It's designed to work both locally and in CI/CD environments.
#
# USAGE:
#   ./infra/scripts/migrate-database.sh [OPTIONS]
#
# OPTIONS:
#   --deploy              Run migrations in production mode (no prompts)
#   --reset               Reset database and run all migrations (DANGEROUS)
#   --dry-run             Show what migrations would be applied
#   --verify              Verify database schema matches Prisma schema
#   --seed                Run database seeding after migrations
#   --local               Run migrations via ECS task (for local development)
#   --timeout SECONDS     Migration timeout in seconds (default: 300)
#
# ENVIRONMENT VARIABLES:
#   REQUIRED:
#     DATABASE_URL            Direct database URL (mandatory)
#     AWS_ACCESS_KEY_ID       AWS access key for API calls
#     AWS_SECRET_ACCESS_KEY   AWS secret key for API calls
#
#   OPTIONAL:
#     SKIP_BACKUP             Skip pre-migration backup (default: false)
#
# REQUIREMENTS:
#   - Node.js runtime with pnpm
#   - AWS CLI configured (if DATABASE_URL not provided)
#   - Terraform applied (for getting RDS credentials)
# =============================================================================

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
readonly REGION="us-east-1"
readonly TIMEOUT="${TIMEOUT:-300}"

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
DEPLOY_MODE=false
RESET_MODE=false
DRY_RUN=false
VERIFY_MODE=false
SEED_MODE=false
LOCAL_MODE=false
SKIP_BACKUP="${SKIP_BACKUP:-false}"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
	case $1 in
		--deploy)
			DEPLOY_MODE=true
			shift
			;;
		--reset)
			RESET_MODE=true
			shift
			;;
		--dry-run)
			DRY_RUN=true
			shift
			;;
		--verify)
			VERIFY_MODE=true
			shift
			;;
		--seed)
			SEED_MODE=true
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
		*)
			log_error "Unknown option: $1"
			log_info "Usage: $0 [--deploy|--reset|--dry-run|--verify|--seed|--local] [--timeout SECONDS]"
			exit 1
			;;
	esac
done

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
	
	if ! command -v aws >/dev/null 2>&1 && [[ "$LOCAL_MODE" == "true" ]]; then
		log_error "AWS CLI not found but required for local mode (ECS operations)."
		((errors++))
	fi
	
	# Check if we're in the right directory
	if [[ ! -f "$PROJECT_ROOT/prisma/schema.prisma" ]]; then
		log_error "Prisma schema not found. Are you in the right directory?"
		((errors++))
	fi
	
	# Check if migrations directory exists
	if [[ ! -d "$PROJECT_ROOT/prisma/migrations" ]]; then
		log_error "Migrations directory not found. Run 'pnpm prisma:migrate:dev' first."
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
	local required_vars=()
	
	# DATABASE_URL is now mandatory
	required_vars+=(
		"DATABASE_URL:Direct database connection string"
	)
	
	# For local mode, we need AWS credentials for ECS operations
	if [[ "$LOCAL_MODE" == "true" ]]; then
		required_vars+=(
			"AWS_ACCESS_KEY_ID:AWS access key for ECS operations"
			"AWS_SECRET_ACCESS_KEY:AWS secret key for ECS operations"
		)
	fi
	
	# Check each required variable
	for var_info in "${required_vars[@]}"; do
		local var_name="${var_info%%:*}"
		local var_description="${var_info#*:}"
		
		if [[ -z "${!var_name:-}" ]]; then
			log_error "Missing required environment variable: $var_name"
			log_error "  Description: $var_description"
			((errors++))
		fi
	done
	

	
	# Validate DATABASE_URL format if provided
	if [[ -n "${DATABASE_URL:-}" ]]; then
		if [[ ! "${DATABASE_URL}" =~ ^postgresql:// ]]; then
			log_error "Invalid DATABASE_URL format: must start with 'postgresql://'"
			((errors++))
		fi
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
		log_error "Optional environment variables:"
		log_error "  SKIP_BACKUP          - Skip pre-migration backup (true/false)"
		log_error ""
		log_error "Example usage:"
		log_error "  export DATABASE_URL=postgresql://user:pass@host:5432/db"
		if [[ "$LOCAL_MODE" == "true" ]]; then
			log_error "  export AWS_ACCESS_KEY_ID=your-access-key"
			log_error "  export AWS_SECRET_ACCESS_KEY=your-secret-key"
		fi
		log_error "  $0 --deploy --seed"
		log_error ""
		exit 1
	fi
	
	log_success "Environment variables validated"
}

get_terraform_output() {
	local output_name="$1"
	if [[ -f "$SCRIPT_DIR/../terraform/terraform.tfstate" ]]; then
		terraform -chdir="$SCRIPT_DIR/../terraform" output -raw "$output_name" 2>/dev/null || {
			log_error "Failed to get Terraform output: $output_name"
			log_error "Make sure you've run 'terraform apply' first"
			exit 1
		}
	else
		log_error "Terraform state file not found. Run 'terraform apply' first."
		exit 1
	fi
}

setup_database_url() {
	log_info "Using provided DATABASE_URL"
	# DATABASE_URL is now mandatory and validated in validate_environment_variables
}

# =============================================================================
# Local Mode (ECS Task Execution)
# =============================================================================

run_via_ecs_task() {
	log_info "Running migrations via ECS task (local mode)..."
	
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
	
	# Build the migration command
	local migration_cmd="cd /usr/src/app"
	
	# If only seeding is requested, skip migration commands entirely
	if [[ "$SEED_MODE" == "true" && "$DEPLOY_MODE" != "true" && "$RESET_MODE" != "true" && "$DRY_RUN" != "true" && "$VERIFY_MODE" != "true" ]]; then
		migration_cmd="$migration_cmd && pnpm run prisma:seed"
	else
		# Build migration command
		migration_cmd="$migration_cmd && pnpm exec prisma migrate"
		
		if [[ "$DEPLOY_MODE" == "true" ]]; then
			migration_cmd="$migration_cmd deploy"
		elif [[ "$RESET_MODE" == "true" ]]; then
			migration_cmd="$migration_cmd reset --force --skip-seed"
		elif [[ "$DRY_RUN" == "true" ]]; then
			migration_cmd="$migration_cmd status"
		elif [[ "$VERIFY_MODE" == "true" ]]; then
			migration_cmd="cd /usr/src/app && pnpm exec prisma db pull --force --print"
		else
			migration_cmd="$migration_cmd dev --skip-seed"
		fi
		
		# Add seeding if requested
		if [[ "$SEED_MODE" == "true" ]]; then
			migration_cmd="$migration_cmd && pnpm run prisma:seed"
		fi
	fi
	
	log_info "Command to run: $migration_cmd"
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
				\"command\": [\"sh\", \"-c\", \"$migration_cmd\"]
			}]
		}" \
		--query 'tasks[0].taskArn' \
		--output text 2>/dev/null)" || {
		log_error "Failed to start ECS task"
		exit 1
	}
	
	log_success "Migration task started: $task_arn"
	
	# Wait for task completion
	log_info "Waiting for migration task to complete..."
	
	local start_time
	start_time="$(date +%s)"
	
	while true; do
		local current_time
		current_time="$(date +%s)"
		local elapsed=$((current_time - start_time))
		
		if [[ $elapsed -gt $TIMEOUT ]]; then
			log_error "Migration task timeout after ${TIMEOUT} seconds"
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
				log_success "Migration task completed successfully"
				break
			else
				log_error "Migration task failed with exit code: $exit_code"
				
				# Show logs
				log_info "Recent task logs:"
				aws logs tail "/ecs/nestql" \
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
	log_info "Migration task logs:"
	aws logs tail "/ecs/nestql" \
		--region "$REGION" \
		--since 10m \
		--format short 2>/dev/null | tail -30 || {
		log_warn "Could not retrieve task logs"
	}
}

# =============================================================================
# Migration Operations
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

backup_database() {
	if [[ "$SKIP_BACKUP" == "true" ]]; then
		log_info "Skipping database backup (SKIP_BACKUP=true)"
		return 0
	fi
	
	log_info "Creating pre-migration backup..."
	
	# Create a manual snapshot via AWS CLI (if possible)
	local db_instance_id
	if db_instance_id="$(get_terraform_output rds_instance_id 2>/dev/null)"; then
		local snapshot_id="nestql-pre-migration-$(date +%Y%m%d-%H%M%S)"
		
		log_info "Creating RDS snapshot: $snapshot_id"
		aws rds create-db-snapshot \
			--region "$REGION" \
			--db-instance-identifier "$db_instance_id" \
			--db-snapshot-identifier "$snapshot_id" >/dev/null 2>&1 || {
			log_warn "Failed to create RDS snapshot, but continuing..."
		}
	else
		log_warn "Could not determine RDS instance ID for backup"
	fi
}

run_migrations() {
	log_info "Running database migrations..."
	
	cd "$PROJECT_ROOT"
	
	if [[ "$RESET_MODE" == "true" ]]; then
		log_warn "RESET MODE: This will delete all data and reset the database!"
		if [[ "$DEPLOY_MODE" != "true" ]]; then
			read -p "Are you sure you want to continue? (yes/no): " -r
			if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
				log_info "Migration cancelled by user"
				exit 0
			fi
		fi
		
		log_info "Resetting database..."
		pnpm exec prisma migrate reset --force --skip-seed
		log_success "Database reset completed"
		return 0
	fi
	
	if [[ "$DRY_RUN" == "true" ]]; then
		log_info "DRY RUN: Showing pending migrations..."
		pnpm exec prisma migrate status
		return 0
	fi
	
	if [[ "$DEPLOY_MODE" == "true" ]]; then
		log_info "Running migrations in deploy mode..."
		pnpm exec prisma migrate deploy
	else
		log_info "Running migrations in development mode..."
		pnpm exec prisma migrate dev --skip-seed
	fi
	
	log_success "Database migrations completed"
}

verify_schema() {
	if [[ "$VERIFY_MODE" != "true" && "$DEPLOY_MODE" != "true" ]]; then
		return 0
	fi
	
	log_info "Verifying database schema..."
	
	cd "$PROJECT_ROOT"
	
	# Check if database schema matches Prisma schema
	if pnpm exec prisma db pull --force --print 2>/dev/null | diff - prisma/schema.prisma >/dev/null 2>&1; then
		log_success "Database schema matches Prisma schema"
	else
		log_warn "Database schema differs from Prisma schema"
		log_info "This might be expected if you have pending migrations"
	fi
}

run_seed() {
	if [[ "$SEED_MODE" != "true" ]]; then
		return 0
	fi
	
	log_info "Running database seeding..."
	
	cd "$PROJECT_ROOT"
	
	if [[ -f "prisma/seed.ts" ]]; then
		pnpm exec tsx prisma/seed.ts
		log_success "Database seeding completed"
	else
		log_warn "No seed file found at prisma/seed.ts"
	fi
}

generate_prisma_client() {
	log_info "Generating Prisma client..."
	
	cd "$PROJECT_ROOT"
	
	pnpm exec prisma generate
	log_success "Prisma client generated"
}

show_migration_status() {
	log_info "Migration status:"
	
	cd "$PROJECT_ROOT"
	
	pnpm exec prisma migrate status || log_warn "Could not get migration status"
}

show_summary() {
	log_info ""
	log_success "Migration Summary"
	log_info "=================="
	log_info "Database: Main RDS (nestql)"
	log_info "Mode: $([[ "$DEPLOY_MODE" == "true" ]] && echo "Production Deploy" || echo "Development")"
	
	if [[ "$RESET_MODE" == "true" ]]; then
		log_info "Action: Database Reset"
	elif [[ "$DRY_RUN" == "true" ]]; then
		log_info "Action: Dry Run"
	elif [[ "$VERIFY_MODE" == "true" ]]; then
		log_info "Action: Schema Verification"
	else
		log_info "Action: Migration Apply"
	fi
	
	log_info ""
	log_info "Useful commands:"
	log_info "  Check status: pnpm exec prisma migrate status"
	log_info "  View data: pnpm exec prisma studio"
	log_info "  Reset DB: $0 --reset"
	log_info ""
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	log_info "Starting NestQL database migration"
	log_info "Mode: $([[ "$DEPLOY_MODE" == "true" ]] && echo "Production" || [[ "$LOCAL_MODE" == "true" ]] && echo "Local (ECS)" || echo "Development")"
	log_info "Region: $REGION"
	
	validate_prerequisites
	validate_environment_variables
	
	# Handle local mode (ECS task execution)
	if [[ "$LOCAL_MODE" == "true" ]]; then
		log_info "Running migrations via ECS task (bypasses local network limitations)"
		run_via_ecs_task
		show_summary
		log_success "Database migration completed successfully!"
		return 0
	fi
	
	# Standard mode (direct connection)
	setup_database_url
	check_database_connection
	
	if [[ "$VERIFY_MODE" == "true" ]]; then
		verify_schema
		show_migration_status
	elif [[ "$DRY_RUN" == "true" ]]; then
		run_migrations  # Will only show status in dry-run mode
	else
		backup_database
		run_migrations
		generate_prisma_client
		verify_schema
		run_seed
		show_migration_status
	fi
	
	show_summary
	log_success "Database migration completed successfully!"
}

# =============================================================================
# Entry Point
# =============================================================================

# Ensure we're in the project root for consistent behavior
cd "$PROJECT_ROOT"

main "$@"
