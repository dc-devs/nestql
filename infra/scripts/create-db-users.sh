#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Database User Creation Script (Rewritten)
# =============================================================================
# This script creates application users on RDS PostgreSQL instances.
# It avoids the complex shell escaping issues of the original by using
# environment variables and simpler command construction.
#
# USAGE:
#   export NESTQL_APP_PASSWORD="your-secure-password-for-nestql-db"
#   export MASTRA_APP_PASSWORD="your-secure-password-for-mastra-db"
#   ./infra/scripts/create-db-users-new.sh
#
# REQUIREMENTS:
#   - AWS CLI configured with appropriate permissions
#   - Terraform applied (for infrastructure discovery)
#   - Both password environment variables must be set
#   - Passwords must be at least 12 characters long
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

# Error handling
cleanup() {
	local exit_code=$?
	if [[ -n "${TEMP_FILES:-}" ]]; then
		rm -f $TEMP_FILES
	fi
	exit $exit_code
}
trap cleanup EXIT

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
readonly CLUSTER_NAME="$(get_terraform_output ecs_cluster_name)"
readonly DB_ENDPOINT="$(get_terraform_output db_endpoint)"
readonly MASTRA_DB_ENDPOINT="$(get_terraform_output mastra_db_endpoint)"

# Get security group and subnets
readonly ECS_SG_ID="$(aws ec2 describe-security-groups --region "$REGION" \
	--filters "Name=group-name,Values=${APP_NAME}-ecs-sg" \
	--query "SecurityGroups[0].GroupId" --output text 2>/dev/null || echo "")"

readonly SUBNET_IDS="$(aws ec2 describe-subnets --region "$REGION" \
	--filters "Name=tag:Name,Values=${APP_NAME}-private-*" \
	--query "Subnets[].SubnetId" --output json 2>/dev/null || echo "[]")"

# Validate required infrastructure
[[ -n "$CLUSTER_NAME" ]] || { log_error "ECS cluster not found"; exit 1; }
[[ -n "$DB_ENDPOINT" ]] || { log_error "Main DB endpoint not found"; exit 1; }
[[ -n "$MASTRA_DB_ENDPOINT" ]] || { log_error "Mastra DB endpoint not found"; exit 1; }
[[ -n "$ECS_SG_ID" ]] || { log_error "ECS security group not found"; exit 1; }
[[ "$SUBNET_IDS" != "[]" ]] || { log_error "Private subnets not found"; exit 1; }

log_info "Infrastructure validated successfully"

# =============================================================================
# Database Connection Details
# =============================================================================

get_rds_master_credentials() {
	local db_instance_id="$1"
	local secret_arn
	local secret_json
	
	log_info "Getting master credentials for $db_instance_id..." >&2
	
	secret_arn="$(aws rds describe-db-instances --region "$REGION" \
		--db-instance-identifier "$db_instance_id" \
		--query "DBInstances[0].MasterUserSecret.SecretArn" --output text 2>/dev/null || echo "")"
	
	[[ -n "$secret_arn" && "$secret_arn" != "None" ]] || {
		log_error "Master user secret not found for $db_instance_id" >&2
		exit 1
	}
	
	secret_json="$(aws secretsmanager get-secret-value --region "$REGION" \
		--secret-id "$secret_arn" --query SecretString --output text)"
	
	echo "$secret_json"
}

# Get master credentials
log_info "Retrieving master database credentials..."
readonly MAIN_DB_MASTER_JSON="$(get_rds_master_credentials "${APP_NAME}-db")"
readonly MASTRA_DB_MASTER_JSON="$(get_rds_master_credentials "${APP_NAME}-mastra-db")"

readonly MAIN_DB_MASTER_USER="$(echo "$MAIN_DB_MASTER_JSON" | jq -r '.username // empty')"
readonly MAIN_DB_MASTER_PASS="$(echo "$MAIN_DB_MASTER_JSON" | jq -r '.password // empty')"
readonly MASTRA_DB_MASTER_USER="$(echo "$MASTRA_DB_MASTER_JSON" | jq -r '.username // empty')"
readonly MASTRA_DB_MASTER_PASS="$(echo "$MASTRA_DB_MASTER_JSON" | jq -r '.password // empty')"

# Validate credentials were extracted
[[ -n "$MAIN_DB_MASTER_USER" && "$MAIN_DB_MASTER_USER" != "null" ]] || { 
	log_error "Failed to extract main DB master username"; 
	log_error "Raw JSON: $MAIN_DB_MASTER_JSON"; 
	exit 1; 
}
[[ -n "$MASTRA_DB_MASTER_USER" && "$MASTRA_DB_MASTER_USER" != "null" ]] || { 
	log_error "Failed to extract Mastra DB master username"; 
	log_error "Raw JSON: $MASTRA_DB_MASTER_JSON"; 
	exit 1; 
}

log_info "Master users: main=$MAIN_DB_MASTER_USER, mastra=$MASTRA_DB_MASTER_USER"

# Application user details
readonly NESTQL_APP_USER="nestql_app"
readonly NESTQL_DB_NAME="nestql"
readonly MASTRA_APP_USER="mastra_app"
readonly MASTRA_DB_NAME="mastra"

# Validate required environment variables
log_info "Validating required environment variables..."
if [[ -z "${NESTQL_APP_PASSWORD:-}" ]]; then
	log_error "NESTQL_APP_PASSWORD environment variable is required"
	log_error "Please set it with: export NESTQL_APP_PASSWORD='your-secure-password'"
	exit 1
fi

if [[ -z "${MASTRA_APP_PASSWORD:-}" ]]; then
	log_error "MASTRA_APP_PASSWORD environment variable is required"
	log_error "Please set it with: export MASTRA_APP_PASSWORD='your-secure-password'"
	exit 1
fi

# Validate password strength (basic checks)
if [[ ${#NESTQL_APP_PASSWORD} -lt 12 ]]; then
	log_error "NESTQL_APP_PASSWORD must be at least 12 characters long"
	exit 1
fi

if [[ ${#MASTRA_APP_PASSWORD} -lt 12 ]]; then
	log_error "MASTRA_APP_PASSWORD must be at least 12 characters long"
	exit 1
fi

readonly NESTQL_APP_PASSWORD
readonly MASTRA_APP_PASSWORD

log_success "Password validation passed (lengths: ${#NESTQL_APP_PASSWORD}, ${#MASTRA_APP_PASSWORD})"

# =============================================================================
# ECS Task Management
# =============================================================================

readonly TASK_FAMILY="${APP_NAME}-db-user-creator"
readonly EXEC_ROLE_ARN="$(aws iam get-role --region "$REGION" \
	--role-name "${APP_NAME}-ecs-task-execution-role" --query 'Role.Arn' --output text)"

register_task_definition() {
	log_info "Registering ECS task definition..."
	
	aws ecs register-task-definition --region "$REGION" \
		--family "$TASK_FAMILY" \
		--requires-compatibilities FARGATE \
		--network-mode awsvpc \
		--cpu "256" --memory "512" \
		--execution-role-arn "$EXEC_ROLE_ARN" \
		--container-definitions '[
			{
				"name": "psql",
				"image": "postgres:16-alpine",
				"essential": true,
				"logConfiguration": {
					"logDriver": "awslogs",
					"options": {
						"awslogs-create-group": "true",
						"awslogs-group": "/ecs/'"$APP_NAME"'-db-setup",
						"awslogs-region": "'"$REGION"'",
						"awslogs-stream-prefix": "db-user-creation"
					}
				}
			}
		]' --query 'taskDefinition.taskDefinitionArn' --output text
}

run_database_task() {
	local db_host="$1"
	local master_user="$2"
	local master_pass="$3"
	local target_db="$4"
	local app_user="$5"
	local app_pass="$6"
	
	log_info "Creating user '$app_user' on database '$target_db' at $db_host"
	
	# Create network configuration
	local network_config
	network_config="$(jq -n \
		--argjson subnets "$SUBNET_IDS" \
		--arg sg "$ECS_SG_ID" \
		'{awsvpcConfiguration:{subnets:$subnets,securityGroups:[$sg],assignPublicIp:"DISABLED"}}')"
	
	# Build the command that will run in the container
	local container_command
	container_command="$(cat << 'SCRIPT_END'
set -e
echo "=== Database User Creation Script ==="
echo "Host: $PGHOST"
echo "Master User: $PGUSER" 
echo "Target DB: $TARGET_DB"
echo "App User: $APP_USER"

# Step 1: Create user and database on postgres database
echo "=== Step 1: Creating user and database ==="
psql -d postgres -v ON_ERROR_STOP=1 << SQL_END
-- Create user if not exists
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$APP_USER') THEN
        EXECUTE format('CREATE USER %I WITH PASSWORD %L NOSUPERUSER', '$APP_USER', '$APP_PASS');
        RAISE NOTICE 'Created user: $APP_USER';
    ELSE
        EXECUTE format('ALTER USER %I WITH PASSWORD %L', '$APP_USER', '$APP_PASS');
        RAISE NOTICE 'Updated password for user: $APP_USER';
    END IF;
END \$\$;

-- Create database if not exists
SELECT 'Checking database...' as status;
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = '$TARGET_DB') THEN
        EXECUTE format('CREATE DATABASE %I', '$TARGET_DB');
        RAISE NOTICE 'Created database: $TARGET_DB';
    ELSE
        RAISE NOTICE 'Database already exists: $TARGET_DB';
    END IF;
END \$\$;

-- Grant connection permission
GRANT CONNECT ON DATABASE "$TARGET_DB" TO "$APP_USER";
SQL_END

# Step 2: Grant permissions on the target database
echo "=== Step 2: Granting permissions on target database ==="
psql -d "$TARGET_DB" -v ON_ERROR_STOP=1 << SQL_END
GRANT USAGE, CREATE ON SCHEMA public TO "$APP_USER";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "$APP_USER";
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO "$APP_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "$APP_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO "$APP_USER";
SQL_END

echo "=== Success! User $APP_USER created and configured ==="
SCRIPT_END
)"
	
	# Run the task
	local task_arn
	task_arn="$(aws ecs run-task --region "$REGION" \
		--cluster "$CLUSTER_NAME" \
		--launch-type FARGATE \
		--task-definition "$TASK_FAMILY" \
		--network-configuration "$network_config" \
		--overrides "$(jq -n \
			--arg host "$db_host" \
			--arg master_user "$master_user" \
			--arg master_pass "$master_pass" \
			--arg target_db "$target_db" \
			--arg app_user "$app_user" \
			--arg app_pass "$app_pass" \
			--arg script "$container_command" \
			'{
				containerOverrides: [{
					name: "psql",
					environment: [
						{name: "PGHOST", value: $host},
						{name: "PGUSER", value: $master_user},
						{name: "PGPASSWORD", value: $master_pass},
						{name: "PGSSLMODE", value: "require"},
						{name: "TARGET_DB", value: $target_db},
						{name: "APP_USER", value: $app_user},
						{name: "APP_PASS", value: $app_pass}
					],
					command: ["/bin/sh", "-c", $script]
				}]
			}')" \
		--query 'tasks[0].taskArn' --output text)"
	
	log_info "Started task: $task_arn"
	
	# Wait for completion
	log_info "Waiting for task to complete..."
	aws ecs wait tasks-stopped --region "$REGION" --cluster "$CLUSTER_NAME" --tasks "$task_arn"
	
	# Check exit code
	local exit_code
	exit_code="$(aws ecs describe-tasks --region "$REGION" --cluster "$CLUSTER_NAME" --tasks "$task_arn" \
		--query 'tasks[0].containers[0].exitCode' --output text)"
	
	if [[ "$exit_code" == "0" ]]; then
		log_success "User '$app_user' created successfully on '$target_db'"
		return 0
	else
		log_error "Task failed with exit code: $exit_code"
		log_error "Check logs: aws logs tail '/ecs/${APP_NAME}-db-setup' --since 10m"
		return 1
	fi
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	log_info "Starting database user creation for $APP_NAME"
	log_info "Region: $REGION"
	log_info "Main DB: $DB_ENDPOINT"
	log_info "Mastra DB: $MASTRA_DB_ENDPOINT"
	
	# Register task definition
	local task_def_arn
	task_def_arn="$(register_task_definition)"
	log_success "Task definition registered: $task_def_arn"
	
	# Create log group
	aws logs create-log-group --region "$REGION" --log-group-name "/ecs/${APP_NAME}-db-setup" 2>/dev/null || true
	
	# Create users
	local success=true
	
	if ! run_database_task "$DB_ENDPOINT" "$MAIN_DB_MASTER_USER" "$MAIN_DB_MASTER_PASS" \
		"$NESTQL_DB_NAME" "$NESTQL_APP_USER" "$NESTQL_APP_PASSWORD"; then
		success=false
	fi
	
	if ! run_database_task "$MASTRA_DB_ENDPOINT" "$MASTRA_DB_MASTER_USER" "$MASTRA_DB_MASTER_PASS" \
		"$MASTRA_DB_NAME" "$MASTRA_APP_USER" "$MASTRA_APP_PASSWORD"; then
		success=false
	fi
	
	if [[ "$success" == "true" ]]; then
		log_success "All database users created successfully!"
		log_info ""
		log_info "Next steps:"
		log_info "1. Update your secrets in AWS Secrets Manager with these passwords"
		log_info "2. Redeploy your application"
		log_info ""
		log_info "To update secrets (run these commands):"
		log_info ""
		echo "# Update DATABASE_URL secret"
		echo "aws secretsmanager put-secret-value --region $REGION --secret-id ${APP_NAME}/DATABASE_URL \\"
		echo "  --secret-string \"postgresql://${NESTQL_APP_USER}:\${NESTQL_APP_PASSWORD}@${DB_ENDPOINT}:5432/${NESTQL_DB_NAME}?schema=public&sslmode=require&ssl=true\""
		echo ""
		echo "# Update MASTRA_DATABASE_URL secret"
		echo "aws secretsmanager put-secret-value --region $REGION --secret-id ${APP_NAME}/MASTRA_DATABASE_URL \\"
		echo "  --secret-string \"postgresql://${MASTRA_APP_USER}:\${MASTRA_APP_PASSWORD}@${MASTRA_DB_ENDPOINT}:5432/${MASTRA_DB_NAME}?schema=public&sslmode=require&ssl=true\""
		echo ""
		echo "# Redeploy application"
		echo "aws ecs update-service --region $REGION \\"
		echo "  --cluster \$(terraform -chdir=infra/terraform output -raw ecs_cluster_name) \\"
		echo "  --service \$(terraform -chdir=infra/terraform output -raw ecs_service_name) \\"
		echo "  --force-new-deployment"
		return 0
	else
		log_error "Some operations failed. Check the logs above."
		return 1
	fi
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

if ! command -v jq >/dev/null 2>&1; then
	log_error "jq not found. Please install it first."
	exit 1
fi

# Run main function
main "$@"
