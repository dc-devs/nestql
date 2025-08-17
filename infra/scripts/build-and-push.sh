#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Docker Build and Push Script
# =============================================================================
# This script builds the application Docker image and pushes it to ECR.
#
# USAGE:
#   ./infra/scripts/build-and-push.sh [IMAGE_TAG]
#
# ARGUMENTS:
#   IMAGE_TAG (optional): Custom tag for the image (defaults to git commit hash)
#
# REQUIREMENTS:
#   - AWS CLI configured with ECR permissions
#   - Docker with buildx support
#   - Terraform applied (for ECR repository URL)
#   - Git repository (for default tag generation)
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
	if [[ $exit_code -ne 0 ]]; then
		log_error "Build failed with exit code $exit_code"
	fi
	exit $exit_code
}
trap cleanup EXIT

# =============================================================================
# Validation and Setup
# =============================================================================

validate_prerequisites() {
	log_info "Validating prerequisites..."
	
	local errors=0
	
	# Check required commands
	if ! command -v aws >/dev/null 2>&1; then
		log_error "AWS CLI not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v docker >/dev/null 2>&1; then
		log_error "Docker not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v terraform >/dev/null 2>&1; then
		log_error "Terraform not found. Please install it first."
		((errors++))
	fi
	
	if ! command -v git >/dev/null 2>&1; then
		log_error "Git not found. Please install it first."
		((errors++))
	fi
	
	# Check Docker buildx
	if ! docker buildx version >/dev/null 2>&1; then
		log_error "Docker buildx not available. Please update Docker."
		((errors++))
	fi
	
	# Check if we're in a git repository
	if ! git rev-parse --git-dir >/dev/null 2>&1; then
		log_error "Not in a git repository."
		((errors++))
	fi
	
	# Check for uncommitted changes
	if [[ -n "$(git status --porcelain)" ]]; then
		log_warn "Working directory has uncommitted changes"
		log_warn "Consider committing changes before building production image"
	fi
	
	if [[ $errors -gt 0 ]]; then
		log_error "Found $errors prerequisite error(s). Please fix them and try again."
		exit 1
	fi
	
	log_success "All prerequisites validated"
}

get_terraform_output() {
	local output_name="$1"
	terraform -chdir="${SCRIPT_DIR}/../terraform" output -raw "$output_name" 2>/dev/null || {
		log_error "Failed to get Terraform output: $output_name"
		log_error "Make sure you've run 'terraform apply' first"
		exit 1
	}
}

setup_variables() {
	log_info "Setting up build variables..."
	
	# Get ECR repository URL from Terraform
	readonly ECR_REPO="$(get_terraform_output ecr_repository_url)"
	log_info "ECR Repository: $ECR_REPO"
	
	# Determine image tag
	if [[ -n "${1:-}" ]]; then
		readonly IMAGE_TAG="$1"
		log_info "Using provided image tag: $IMAGE_TAG"
	else
		readonly IMAGE_TAG="$(git rev-parse --short HEAD)"
		log_info "Using git commit tag: $IMAGE_TAG"
	fi
	
	# Get current branch for context
	local current_branch
	current_branch="$(git branch --show-current 2>/dev/null || echo 'unknown')"
	log_info "Current branch: $current_branch"
	
	# Get commit info
	local commit_message
	commit_message="$(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'unknown')"
	log_info "Commit message: $commit_message"
	
	log_success "Build variables configured"
}

# =============================================================================
# Docker Operations
# =============================================================================

login_to_ecr() {
	log_info "Logging into ECR..."
	
	if aws ecr get-login-password --region "$REGION" | \
		docker login --username AWS --password-stdin "${ECR_REPO%/*}" >/dev/null 2>&1; then
		log_success "ECR login successful"
	else
		log_error "Failed to login to ECR"
		exit 1
	fi
}

build_image() {
	log_info "Building Docker image..."
	log_info "Platform: linux/amd64"
	log_info "Tags: ${IMAGE_TAG}, latest"
	
	local dockerfile_path="src/base/docker/nql-app/Dockerfile"
	
	if [[ ! -f "$dockerfile_path" ]]; then
		log_error "Dockerfile not found at: $dockerfile_path"
		exit 1
	fi
	
	log_info "Using Dockerfile: $dockerfile_path"
	
	if docker buildx build \
		--platform linux/amd64 \
		-f "$dockerfile_path" \
		-t "${ECR_REPO}:${IMAGE_TAG}" \
		-t "${ECR_REPO}:latest" \
		. ; then
		log_success "Image built successfully"
	else
		log_error "Failed to build Docker image"
		exit 1
	fi
}

push_image() {
	log_info "Pushing images to ECR..."
	
	# Push specific tag
	log_info "Pushing ${ECR_REPO}:${IMAGE_TAG}..."
	if docker push "${ECR_REPO}:${IMAGE_TAG}"; then
		log_success "Tagged image pushed successfully"
	else
		log_error "Failed to push tagged image"
		exit 1
	fi
	
	# Push latest tag
	log_info "Pushing ${ECR_REPO}:latest..."
	if docker push "${ECR_REPO}:latest"; then
		log_success "Latest image pushed successfully"
	else
		log_error "Failed to push latest image"
		exit 1
	fi
}

get_image_info() {
	log_info "Getting image information..."
	
	# Get image size
	local image_size
	image_size="$(docker images "${ECR_REPO}:${IMAGE_TAG}" --format "table {{.Size}}" | tail -n1 || echo 'unknown')"
	log_info "Image size: $image_size"
	
	# Get image digest from ECR
	local image_digest
	image_digest="$(aws ecr describe-images \
		--region "$REGION" \
		--repository-name "${ECR_REPO##*/}" \
		--image-ids imageTag="$IMAGE_TAG" \
		--query 'imageDetails[0].imageDigest' \
		--output text 2>/dev/null || echo 'unknown')"
	log_info "Image digest: ${image_digest:0:20}..."
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	local image_tag="${1:-}"
	
	log_info "Starting Docker build and push for $APP_NAME"
	log_info "Region: $REGION"
	
	validate_prerequisites
	setup_variables "$image_tag"
	login_to_ecr
	build_image
	push_image
	get_image_info
	
	log_success "Build and push completed successfully!"
	log_info ""
	log_info "Image details:"
	log_info "  Repository: $ECR_REPO"
	log_info "  Tag: $IMAGE_TAG"
	log_info "  Available tags: ${IMAGE_TAG}, latest"
	log_info ""
	log_info "Next steps:"
	log_info "  Run: ./infra/scripts/deploy-ecs.sh"
	log_info "  Or:  ./infra/scripts/full-deploy.sh"
}

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
