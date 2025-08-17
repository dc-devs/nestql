#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Full Deployment Pipeline
# =============================================================================
# This script orchestrates the complete deployment process:
# 1. Builds and pushes Docker image to ECR
# 2. Deploys the application to ECS
# 3. Verifies the deployment
#
# USAGE:
#   ./infra/scripts/full-deploy.sh [OPTIONS]
#
# OPTIONS:
#   --image-tag TAG     Custom image tag (defaults to git commit hash)
#   --skip-build        Skip Docker build and push
#   --skip-terraform    Skip Terraform apply step
#   --skip-verification Skip post-deployment verification
#   --timeout SECONDS   Deployment timeout in seconds (default: 600)
#
# REQUIREMENTS:
#   - All prerequisites from build-and-push.sh and deploy-ecs.sh
#   - Clean git working directory (for production builds)
# =============================================================================

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly REGION="${AWS_REGION:-us-east-1}"
readonly APP_NAME="nestql"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }
log_step() { echo -e "${CYAN}[STEP]${NC} $*"; }

# Default options
IMAGE_TAG=""
SKIP_BUILD=false
SKIP_TERRAFORM=false
SKIP_VERIFICATION=false
TIMEOUT=600

# Parse command line arguments
while [[ $# -gt 0 ]]; do
	case $1 in
		--image-tag)
			IMAGE_TAG="$2"
			shift 2
			;;
		--skip-build)
			SKIP_BUILD=true
			shift
			;;
		--skip-terraform)
			SKIP_TERRAFORM=true
			shift
			;;
		--skip-verification)
			SKIP_VERIFICATION=true
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

show_help() {
	cat << 'EOF'
NestQL Full Deployment Pipeline

USAGE:
  ./infra/scripts/full-deploy.sh [OPTIONS]

OPTIONS:
  --image-tag TAG      Custom image tag (defaults to git commit hash)
  --skip-build         Skip Docker build and push
  --skip-terraform     Skip Terraform apply step  
  --skip-verification  Skip post-deployment verification
  --timeout SECONDS    Deployment timeout in seconds (default: 600)
  -h, --help          Show this help message

EXAMPLES:
  # Full deployment with auto-generated tag
  ./infra/scripts/full-deploy.sh

  # Deploy with custom tag
  ./infra/scripts/full-deploy.sh --image-tag v1.2.3

  # Deploy existing image without rebuilding
  ./infra/scripts/full-deploy.sh --skip-build

  # Quick deployment (skip verification)
  ./infra/scripts/full-deploy.sh --skip-verification --timeout 300

EOF
}

# =============================================================================
# Pre-flight Checks
# =============================================================================

validate_environment() {
	log_info "Validating deployment environment..."
	
	# Check git status for production safety
	if [[ -n "$(git status --porcelain 2>/dev/null || echo '')" ]]; then
		log_warn "Working directory has uncommitted changes"
		read -p "Continue with deployment? (y/N): " -n 1 -r
		echo
		if [[ ! $REPLY =~ ^[Yy]$ ]]; then
			log_info "Deployment cancelled by user"
			exit 0
		fi
	fi
	
	# Check current branch
	local current_branch
	current_branch="$(git branch --show-current 2>/dev/null || echo 'unknown')"
	if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
		log_warn "Deploying from branch: $current_branch (not main/master)"
		read -p "Continue with deployment? (y/N): " -n 1 -r
		echo
		if [[ ! $REPLY =~ ^[Yy]$ ]]; then
			log_info "Deployment cancelled by user"
			exit 0
		fi
	fi
	
	log_success "Environment validation passed"
}

show_deployment_plan() {
	log_info ""
	log_info "=== DEPLOYMENT PLAN ==="
	log_info "App: $APP_NAME"
	log_info "Region: $REGION"
	log_info "Image tag: ${IMAGE_TAG:-auto-generated}"
	log_info "Skip build: $SKIP_BUILD"
	log_info "Skip Terraform: $SKIP_TERRAFORM"
	log_info "Skip verification: $SKIP_VERIFICATION"
	log_info "Timeout: ${TIMEOUT}s"
	log_info "======================="
	log_info ""
	
	read -p "Continue with deployment? (y/N): " -n 1 -r
	echo
	if [[ ! $REPLY =~ ^[Yy]$ ]]; then
		log_info "Deployment cancelled by user"
		exit 0
	fi
}

# =============================================================================
# Deployment Steps
# =============================================================================

step_build_and_push() {
	if [[ "$SKIP_BUILD" == true ]]; then
		log_step "Skipping Docker build and push (--skip-build flag)"
		return 0
	fi
	
	log_step "Step 1/2: Building and pushing Docker image"
	
	local build_args=()
	if [[ -n "$IMAGE_TAG" ]]; then
		build_args+=("$IMAGE_TAG")
	fi
	
	if "${SCRIPT_DIR}/build-and-push.sh" "${build_args[@]+"${build_args[@]}"}"; then
		log_success "Build and push completed"
	else
		log_error "Build and push failed"
		exit 1
	fi
}

step_deploy_ecs() {
	log_step "Step 2/2: Deploying to ECS"
	
	local deploy_args=()
	if [[ "$SKIP_TERRAFORM" == true ]]; then
		deploy_args+=("--skip-terraform")
	fi
	if [[ "$SKIP_VERIFICATION" == true ]]; then
		deploy_args+=("--skip-verification")
	fi
	deploy_args+=("--timeout" "$TIMEOUT")
	
	if "${SCRIPT_DIR}/deploy-ecs.sh" "${deploy_args[@]}"; then
		log_success "ECS deployment completed"
	else
		log_error "ECS deployment failed"
		exit 1
	fi
}

# =============================================================================
# Error Handling
# =============================================================================

handle_deployment_failure() {
	log_error ""
	log_error "=== DEPLOYMENT FAILED ==="
	log_error "Check the logs above for specific error details"
	log_error ""
	log_error "Common troubleshooting steps:"
	log_error "1. Check ECS service status:"
	log_error "   aws ecs describe-services --cluster \$(terraform -chdir=infra/terraform output -raw ecs_cluster_name) --services \$(terraform -chdir=infra/terraform output -raw ecs_service_name)"
	log_error ""
	log_error "2. Check application logs:"
	log_error "   aws logs tail '/ecs/${APP_NAME}' --since 10m --format short"
	log_error ""
	log_error "3. Check ECS task events:"
	log_error "   aws ecs describe-services --cluster \$(terraform -chdir=infra/terraform output -raw ecs_cluster_name) --services \$(terraform -chdir=infra/terraform output -raw ecs_service_name) --query 'services[0].events[0:5]'"
	log_error "=========================="
	exit 1
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	local start_time
	start_time="$(date +%s)"
	
	log_info "Starting full deployment pipeline for $APP_NAME"
	
	validate_environment
	show_deployment_plan
	
	# Execute deployment steps
	step_build_and_push
	step_deploy_ecs
	
	# Calculate deployment time
	local end_time
	end_time="$(date +%s)"
	local duration=$((end_time - start_time))
	local minutes=$((duration / 60))
	local seconds=$((duration % 60))
	
	# Final success message
	log_success ""
	log_success "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY! 🎉"
	log_success ""
	log_success "Total time: ${minutes}m ${seconds}s"
	log_success "Application URL: https://$(terraform -chdir=infra/terraform output -raw api_domain 2>/dev/null || echo 'api.dc-devs.com')"
	log_success "Health check: https://$(terraform -chdir=infra/terraform output -raw api_domain 2>/dev/null || echo 'api.dc-devs.com')/ping"
	log_success ""
}

# Error trap
trap 'handle_deployment_failure' ERR

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
