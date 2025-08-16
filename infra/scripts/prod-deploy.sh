#!/usr/bin/env bash
set -euo pipefail

# Config
AWS_REGION="${AWS_REGION:-us-east-1}"
TF_DIR="infra/terraform"

#########################
# Env validation & info #
#########################

require_env() {
	local name="$1"
	if [[ -z "${!name:-}" ]]; then
		echo "Error: env var $name is required" >&2
		exit 1
	fi
}

mask() {
	local v="$1"; local n=${#v}
	if (( n <= 8 )); then printf '%s' "****"; else printf '%s%s' "****" "${v: -4}"; fi
}

echo "================ Deploy Config (debug) ================"
echo "AWS_REGION=${AWS_REGION}"
echo "IMAGE_TAG=${IMAGE_TAG:-<auto git sha>}"
if [[ -n "${AWS_PROFILE:-}" ]]; then
	echo "AWS auth: profile=${AWS_PROFILE}"
elif [[ -n "${AWS_ACCESS_KEY_ID:-}" && -n "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
	echo "AWS auth: access_key_id=***$(mask "${AWS_ACCESS_KEY_ID}") session_token=${AWS_SESSION_TOKEN:+present}"
else
	echo "AWS auth: not detected (set AWS_PROFILE or AWS_ACCESS_KEY_ID/SECRET)" >&2
	exit 1
fi
echo "TF_DIR=${TF_DIR}"
echo "======================================================="

require() {
	command -v "$1" >/dev/null 2>&1 || { echo "Error: $1 is required" >&2; exit 1; }
}

require aws
require terraform
require docker

ECR_REPO="$(terraform -chdir="${TF_DIR}" output -raw ecr_repository_url)"
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD)}"

echo "ECR_REPO: ${ECR_REPO}"
echo "IMAGE_TAG: ${IMAGE_TAG}"

if [[ -z "${ECR_REPO}" ]]; then
	echo "Error: ECR_REPO terraform output is empty" >&2
	exit 1
fi

echo "Logging in to ECR..."
aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${ECR_REPO%/*}"

echo "Building image (linux/amd64)..."
docker buildx build --platform linux/amd64 -f src/base/docker/nql-app/Dockerfile \
	-t "${ECR_REPO}:${IMAGE_TAG}" -t "${ECR_REPO}:latest" .

echo "Pushing tags separately..."
docker push "${ECR_REPO}:${IMAGE_TAG}"
docker push "${ECR_REPO}:latest"

echo "Forcing ECS service to deploy new task..."
CLUSTER="$(terraform -chdir="${TF_DIR}" output -raw ecs_cluster_name)"
SERVICE="$(terraform -chdir="${TF_DIR}" output -raw ecs_service_name)"
echo "CLUSTER: ${CLUSTER}"
echo "SERVICE: ${SERVICE}"
aws ecs update-service --cluster "${CLUSTER}" --service "${SERVICE}" --force-new-deployment >/dev/null

echo "Done." 
echo "Verify with: curl -I https://api.dc-devs.com/ping"
echo "Check logs with: aws logs tail \"/ecs/nestql\" --since 3m --format short | cat"


