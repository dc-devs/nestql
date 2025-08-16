#!/usr/bin/env bash
set -euo pipefail

# Config
AWS_REGION="${AWS_REGION:-us-east-1}"
TF_DIR="infra/terraform"

require() {
	command -v "$1" >/dev/null 2>&1 || { echo "Error: $1 is required" >&2; exit 1; }
}

require aws
require terraform

echo "Fetching endpoints from Terraform outputs..."
DB_HOST=$(terraform -chdir="${TF_DIR}" output -raw db_endpoint)
MASTRA_DB_HOST=$(terraform -chdir="${TF_DIR}" output -raw mastra_db_endpoint)
REDIS_HOST=$(terraform -chdir="${TF_DIR}" output -raw redis_endpoint)

if [[ -z "${DB_HOST}" || -z "${MASTRA_DB_HOST}" || -z "${REDIS_HOST}" ]]; then
	echo "Error: One or more Terraform outputs are empty. Ensure 'terraform apply' succeeded." >&2
	exit 1
fi

read -r -p "Region [${AWS_REGION}]: " _in_region || true
AWS_REGION=${_in_region:-$AWS_REGION}

echo
read -r -p "Enter OpenAI API key: " OPENAI_API_KEY
read -r -p "Enter Anthropic API key: " ANTHROPIC_API_KEY

echo
read -r -p "DB user for app database [nestql_app]: " NESTQL_APP_USER_INPUT || true
NESTQL_APP_USER=${NESTQL_APP_USER_INPUT:-nestql_app}
read -s -r -p "Password for ${NESTQL_APP_USER} (app DB): " NESTQL_APP_PASSWORD; echo

read -r -p "DB user for Mastra database [mastra_app]: " MASTRA_APP_USER_INPUT || true
MASTRA_APP_USER=${MASTRA_APP_USER_INPUT:-mastra_app}
read -s -r -p "Password for ${MASTRA_APP_USER} (mastra DB): " MASTRA_APP_PASSWORD; echo

echo
read -s -r -p "Enter SESSION_SECRET: " SESSION_SECRET; echo

DATABASE_URL="postgresql://${NESTQL_APP_USER}:${NESTQL_APP_PASSWORD}@${DB_HOST}:5432/nestql?schema=public&sslmode=require&ssl=true"
MASTRA_DATABASE_URL="postgresql://${MASTRA_APP_USER}:${MASTRA_APP_PASSWORD}@${MASTRA_DB_HOST}:5432/mastra?schema=public&sslmode=require&ssl=true"
REDIS_URL="redis://${REDIS_HOST}:6379/0"

echo
echo "Writing secrets to AWS Secrets Manager in region ${AWS_REGION}..."

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/DATABASE_URL \
	--secret-string "${DATABASE_URL}" >/dev/null

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/MASTRA_DATABASE_URL \
	--secret-string "${MASTRA_DATABASE_URL}" >/dev/null

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/REDIS_URL \
	--secret-string "${REDIS_URL}" >/dev/null

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/SESSION_SECRET \
	--secret-string "${SESSION_SECRET}" >/dev/null

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/OPENAI_API_KEY \
	--secret-string "${OPENAI_API_KEY}" >/dev/null

aws secretsmanager put-secret-value --region "${AWS_REGION}" --secret-id nestql/ANTHROPIC_API_KEY \
	--secret-string "${ANTHROPIC_API_KEY}" >/dev/null

echo "Done. Secrets updated."

echo
echo "Next: scale service to 1 task"
echo "  terraform -chdir=${TF_DIR} apply -var='ecs_desired_count=1'"


