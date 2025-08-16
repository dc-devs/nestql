#!/usr/bin/env bash
set -euo pipefail

REGION="us-east-1"
APP_NAME="nestql"

# Names created by Terraform
CLUSTER_NAME="$(terraform -chdir=infra/terraform output -raw ecs_cluster_name)"
ECS_SG_ID="$(aws ec2 describe-security-groups --region "$REGION" \
  --filters "Name=group-name,Values=${APP_NAME}-ecs-sg" \
  --query "SecurityGroups[0].GroupId" --output text)"

# Private subnets (named like nestql-private-0/1)
SUBNET_IDS_JSON="$(aws ec2 describe-subnets --region "$REGION" \
  --filters "Name=tag:Name,Values=${APP_NAME}-private-*" \
  --query "Subnets[].SubnetId" --output json)"

# RDS endpoints + master creds
MAIN_DB_ID="${APP_NAME}-db"
MASTRA_DB_ID="${APP_NAME}-mastra-db"

get_db_info() {
  local db_id="$1"
  local endpoint secret_arn secret_json user pass
  endpoint="$(aws rds describe-db-instances --region "$REGION" \
    --db-instance-identifier "$db_id" \
    --query "DBInstances[0].Endpoint.Address" --output text)"
  secret_arn="$(aws rds describe-db-instances --region "$REGION" \
    --db-instance-identifier "$db_id" \
    --query "DBInstances[0].MasterUserSecret.SecretArn" --output text)"
  secret_json="$(aws secretsmanager get-secret-value --region "$REGION" \
    --secret-id "$secret_arn" --query SecretString --output text)"
  user="$(jq -r .username <<<"$secret_json")"
  pass="$(jq -r .password <<<"$secret_json")"
  echo "$endpoint|$user|$pass"
}

read -r MAIN_HOST MAIN_USER MAIN_PASS <<<"$(get_db_info "$MAIN_DB_ID" | tr '|' ' ')"
read -r MASTRA_HOST MASTRA_USER MASTRA_PASS <<<"$(get_db_info "$MASTRA_DB_ID" | tr '|' ' ')"

# App DB users to create (set your strong passwords)
NESTQL_APP_USER="nestql_app"
NESTQL_APP_PASSWORD="${NESTQL_APP_PASSWORD:-changeMeNestql!}"   # export NESTQL_APP_PASSWORD=... to override
NESTQL_DB_NAME="nestql"

MASTRA_APP_USER="mastra_app"
MASTRA_APP_PASSWORD="${MASTRA_APP_PASSWORD:-changeMeMastra!}"   # export MASTRA_APP_PASSWORD=... to override
MASTRA_DB_NAME="mastra"

# TEMPORARY DEBUG LOGGING — remove before committing to CI/CD
echo "================ DEBUG (temp) ================"
echo "REGION=$REGION APP_NAME=$APP_NAME"
echo "CLUSTER_NAME=$CLUSTER_NAME"
echo "ECS_SG_ID=$ECS_SG_ID"
echo "SUBNET_IDS=$(jq -r '.[]?' <<<"$SUBNET_IDS_JSON" | xargs echo)"
echo "MAIN_HOST=$MAIN_HOST MASTRA_HOST=$MASTRA_HOST"
echo "NESTQL_APP_USER=$NESTQL_APP_USER NESTQL_DB_NAME=$NESTQL_DB_NAME"
echo "MASTRA_APP_USER=$MASTRA_APP_USER MASTRA_DB_NAME=$MASTRA_DB_NAME"
# Do not print secrets; show length and whether defaults are in use
echo "NESTQL_APP_PASSWORD_LEN=${#NESTQL_APP_PASSWORD} DEFAULT_USED=$( [ "$NESTQL_APP_PASSWORD" = "changeMeNestql!" ] && echo yes || echo no )"
echo "MASTRA_APP_PASSWORD_LEN=${#MASTRA_APP_PASSWORD} DEFAULT_USED=$( [ "$MASTRA_APP_PASSWORD" = "changeMeMastra!" ] && echo yes || echo no )"
# Show hex of last byte to detect stray newlines without exposing value
printf '%s' "$NESTQL_APP_PASSWORD" | tail -c1 | od -An -t x1 | awk '{print "NESTQL_APP_PASSWORD_LASTBYTE_HEX="$1}'
printf '%s' "$MASTRA_APP_PASSWORD" | tail -c1 | od -An -t x1 | awk '{print "MASTRA_APP_PASSWORD_LASTBYTE_HEX="$1}'
echo "============================================="

# Create a simple Fargate task definition using postgres client
TASK_FAMILY="${APP_NAME}-psql-runner"
EXEC_ROLE_ARN="$(aws iam get-role --region "$REGION" \
  --role-name "${APP_NAME}-ecs-task-execution-role" --query 'Role.Arn' --output text)"

register_td() {
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
        "entryPoint": ["/bin/sh","-lc"],
        "command": ["echo ready"],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-create-group": "true",
            "awslogs-group": "/ecs/'"$APP_NAME"'-psql",
            "awslogs-region": "'"$REGION"'",
            "awslogs-stream-prefix": "psql"
          }
        }
      }
    ]' >/dev/null
}

run_sql() {
  local host="$1" m_user="$2" m_pass="$3" target_db="$4" app_user="$5" app_pass="$6"
  local cmd
  # Chain with && so any failure aborts; ensure DB exists; require TLS.
  printf -v cmd "%s && %s && %s && %s && %s" \
    "PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -tAc \"SELECT 1 FROM pg_roles WHERE rolname='$app_user'\" | grep -q 1 || PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -c \"CREATE USER $app_user WITH PASSWORD '$app_pass' NOSUPERUSER;\"" \
    "PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -c \"ALTER USER $app_user WITH PASSWORD '$app_pass';\"" \
    "PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -tAc \"SELECT 1 FROM pg_database WHERE datname='$target_db'\" | grep -q 1 || PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -c \"CREATE DATABASE $target_db;\"" \
    "PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d postgres -v ON_ERROR_STOP=1 -c \"GRANT CONNECT ON DATABASE $target_db TO $app_user;\"" \
    "PGPASSWORD='$m_pass' PGSSLMODE=require psql -h '$host' -U '$m_user' -d '$target_db' -v ON_ERROR_STOP=1 -c \"GRANT USAGE, CREATE ON SCHEMA public TO $app_user;\" -c \"GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $app_user;\" -c \"GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO $app_user;\" -c \"ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $app_user;\" -c \"ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO $app_user;\""

  local netcfg
  netcfg="$(jq -c -n --argjson subnets "$SUBNET_IDS_JSON" --arg sg "$ECS_SG_ID" '{awsvpcConfiguration:{subnets:$subnets,securityGroups:[$sg],assignPublicIp:"DISABLED"}}')"

  aws ecs run-task --region "$REGION" \
    --cluster "$CLUSTER_NAME" \
    --launch-type FARGATE \
    --task-definition "$TASK_FAMILY" \
    --network-configuration "$netcfg" \
    --overrides "$(jq -n --arg CMD "$cmd" '{containerOverrides:[{name:"psql",command:["/bin/sh","-lc", $CMD]}]}' )" \
    --query 'tasks[0].taskArn' --output text
}

wait_task() {
  local task_arn="$1"
  aws ecs wait tasks-stopped --region "$REGION" --cluster "$CLUSTER_NAME" --tasks "$task_arn"
  aws ecs describe-tasks --region "$REGION" --cluster "$CLUSTER_NAME" --tasks "$task_arn" \
    --query 'tasks[0].containers[0].exitCode' --output text
}

echo "Registering task definition..."
register_td

echo "Creating/granting user on $NESTQL_DB_NAME..."
TASK1="$(run_sql "$MAIN_HOST" "$MAIN_USER" "$MAIN_PASS" "$NESTQL_DB_NAME" "$NESTQL_APP_USER" "$NESTQL_APP_PASSWORD")"
echo "Task: $TASK1"
CODE1="$(wait_task "$TASK1")"
echo "Exit code: $CODE1"

echo "Creating/granting user on $MASTRA_DB_NAME..."
TASK2="$(run_sql "$MASTRA_HOST" "$MASTRA_USER" "$MASTRA_PASS" "$MASTRA_DB_NAME" "$MASTRA_APP_USER" "$MASTRA_APP_PASSWORD")"
echo "Task: $TASK2"
CODE2="$(wait_task "$TASK2")"
echo "Exit code: $CODE2"

if [[ "$CODE1" == "0" && "$CODE2" == "0" ]]; then
  echo "Success."
else
  echo "One or more tasks failed." >&2
  exit 1
fi

# Optional cleanup: keep TD for future reuse, or uncomment to clean old revisions periodically
# aws ecs list-task-definitions --family-prefix "$TASK_FAMILY" --region "$REGION" --status ACTIVE --query 'taskDefinitionArns' --output text | xargs -n1 -r aws ecs deregister-task-definition --region "$REGION" --task-definition