#!/usr/bin/env bash

# =============================================================================
# NestQL Docker Build and Push Script
# =============================================================================
# This script builds the application Docker image and pushes it to ECR.
#
# USAGE:
#   ./infra/scripts/deployment/build-and-push.sh [OPTIONS] [IMAGE_TAG]
#
# OPTIONS:
#   --auto-approve     Skip all confirmation prompts
#   -h, --help        Show help message
#
# ARGUMENTS:
#   IMAGE_TAG (optional): Custom tag for the image (defaults to git commit hash)
#
# REQUIREMENTS:
#   - AWS CLI configured with ECR permissions
#   - Docker with buildx support
#   - Terraform applied (for ECR repository URL)
#   - Git repository (for default tag generation)
#
# ENVIRONMENT VARIABLES:
#   AWS_ACCESS_KEY_ID       AWS access key (required)
#   AWS_SECRET_ACCESS_KEY   AWS secret access key (required)
#   AWS_REGION              AWS region (optional, defaults to us-east-1)
#   AWS_SESSION_TOKEN       AWS session token (optional, for temporary credentials)
# =============================================================================

# Initialize common utilities
source "$(dirname "${BASH_SOURCE[0]}")/../common/init.sh"

# Default options
AUTO_APPROVE=false

# Argument parsing is now done inline in main() to avoid subshell issues

show_help() {
	show_standard_help "Docker Build and Push Script" \
		"This script builds the application Docker image and pushes it to ECR." \
		"./infra/scripts/deployment/build-and-push.sh [OPTIONS] [IMAGE_TAG]" \
		"  --auto-approve     Skip all confirmation prompts
  -h, --help        Show this help message

ARGUMENTS:
  IMAGE_TAG         Custom tag for the image (optional, defaults to git commit hash)" \
		"  # Build with auto-generated tag
  ./infra/scripts/deployment/build-and-push.sh

  # Build with custom tag
  ./infra/scripts/deployment/build-and-push.sh v1.2.3

  # Build without prompts (for automation)
  ./infra/scripts/deployment/build-and-push.sh --auto-approve

  # Build with custom tag and no prompts
  ./infra/scripts/deployment/build-and-push.sh --auto-approve v1.2.3"
}

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
# Environment Validation
# =============================================================================

validate_deployment_environment() {
	validate_git_status "$AUTO_APPROVE"
}

# =============================================================================
# Validation and Setup
# =============================================================================

validate_prerequisites() {
	local commands=(
		"aws:AWS CLI"
		"docker:Docker"
		"terraform:Terraform"
		"git:Git"
	)
	validate_commands "${commands[@]}"
	validate_terraform_state
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
		readonly IMAGE_TAG="$(get_git_commit_hash short)"
		log_info "Using git commit tag: $IMAGE_TAG"
	fi
	
	# Get current branch for context
	local current_branch
	current_branch="$(get_current_branch)"
	log_info "Current branch: $current_branch"
	
	# Get commit info
	local commit_message
	commit_message="$(get_commit_message)"
	log_info "Commit message: $commit_message"
	
	log_success "Build variables configured"
}

show_build_plan() {
	log_info ""
	log_info "=== BUILD PLAN ==="
	log_info "App: $APP_NAME"
	log_info "Region: $REGION"
	log_info "Image tag: $IMAGE_TAG"
	log_info "ECR Repository: $ECR_REPO"
	log_info "Auto-approve: $AUTO_APPROVE"
	
	# Get current branch for context
	local current_branch
	current_branch="$(get_current_branch)"
	log_info "Current branch: $current_branch"
	
	# Get commit info
	local commit_message
	commit_message="$(get_commit_message)"
	log_info "Commit message: $commit_message"
	
	log_info "=================="
	log_info ""
	
	if [[ "$AUTO_APPROVE" == false ]]; then
		read -p "Continue with build? (y/N): " -n 1 -r
		echo
		if [[ ! $REPLY =~ ^[Yy]$ ]]; then
			log_info "Build cancelled by user"
			exit 0
		fi
	else
		log_info "Auto-approve enabled, starting build immediately"
	fi
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
		--load \
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
	# Parse command line arguments
	local image_tag=""
	
	while [[ $# -gt 0 ]]; do
		case $1 in
			--auto-approve)
				AUTO_APPROVE=true
				shift
				;;
			-h|--help)
				show_help
				exit 0
				;;
			-*)
				log_error "Unknown option: $1"
				show_help
				exit 1
				;;
			*)
				if [[ -z "$image_tag" ]]; then
					image_tag="$1"
				else
					log_error "Too many arguments. Only one image tag is allowed."
					show_help
					exit 1
				fi
				shift
				;;
		esac
	done
	
	log_info "Starting Docker build and push for $APP_NAME"
	log_info "Region: $REGION"
	
	validate_deployment_environment
	validate_aws_credentials
	validate_prerequisites
	setup_variables "$image_tag"
	show_build_plan
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
	log_info "  Run: ./infra/scripts/deployment/deploy-ecs.sh"
}

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
