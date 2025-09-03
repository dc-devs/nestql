#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# NestQL Remote State Bootstrap Script
# =============================================================================
# This script creates the S3 bucket and DynamoDB table needed for Terraform
# remote state backend. Run this ONCE before migrating to remote state.
#
# USAGE:
#   ./infra/scripts/bootstrap-remote-state.sh
#
# REQUIREMENTS:
#   - AWS CLI configured with appropriate permissions
#   - Permissions to create S3 buckets and DynamoDB tables
# =============================================================================

# Initialize common utilities
source "$(dirname "${BASH_SOURCE[0]}")/common/init.sh"

# Configuration
readonly BUCKET_NAME="nestql-terraform-state-$(date +%s)"  # Add timestamp to make unique
readonly DYNAMODB_TABLE="nestql-terraform-locks"
readonly BUCKET_REGION="$REGION"

# =============================================================================
# Validation
# =============================================================================

validate_prerequisites() {
	local commands=(
		"aws:AWS CLI"
		"jq:jq for JSON parsing"
	)
	validate_commands "${commands[@]}"
	validate_aws_credentials
}

check_existing_resources() {
	log_info "Checking for existing resources..."
	
	# Check if bucket already exists
	if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
		log_warn "S3 bucket $BUCKET_NAME already exists"
		return 1
	fi
	
	# Check if DynamoDB table already exists
	if aws dynamodb describe-table --table-name "$DYNAMODB_TABLE" --region "$BUCKET_REGION" >/dev/null 2>&1; then
		log_warn "DynamoDB table $DYNAMODB_TABLE already exists"
		log_info "This is OK - we can reuse the existing table"
	fi
	
	return 0
}

# =============================================================================
# S3 Bucket Creation
# =============================================================================

create_s3_bucket() {
	log_info "Creating S3 bucket: $BUCKET_NAME"
	
	# Create bucket
	if [[ "$BUCKET_REGION" == "us-east-1" ]]; then
		# us-east-1 doesn't need location constraint
		aws s3api create-bucket \
			--bucket "$BUCKET_NAME" \
			--region "$BUCKET_REGION"
	else
		# Other regions need location constraint
		aws s3api create-bucket \
			--bucket "$BUCKET_NAME" \
			--region "$BUCKET_REGION" \
			--create-bucket-configuration LocationConstraint="$BUCKET_REGION"
	fi
	
	log_success "S3 bucket created successfully"
}

configure_s3_bucket() {
	log_info "Configuring S3 bucket security and versioning..."
	
	# Enable versioning
	aws s3api put-bucket-versioning \
		--bucket "$BUCKET_NAME" \
		--versioning-configuration Status=Enabled
	
	# Enable server-side encryption
	aws s3api put-bucket-encryption \
		--bucket "$BUCKET_NAME" \
		--server-side-encryption-configuration '{
			"Rules": [
				{
					"ApplyServerSideEncryptionByDefault": {
						"SSEAlgorithm": "AES256"
					},
					"BucketKeyEnabled": true
				}
			]
		}'
	
	# Block public access (security best practice)
	aws s3api put-public-access-block \
		--bucket "$BUCKET_NAME" \
		--public-access-block-configuration \
			BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
	
	# Add bucket policy to restrict access
	aws s3api put-bucket-policy \
		--bucket "$BUCKET_NAME" \
		--policy "{
			\"Version\": \"2012-10-17\",
			\"Statement\": [
				{
					\"Sid\": \"DenyInsecureConnections\",
					\"Effect\": \"Deny\",
					\"Principal\": \"*\",
					\"Action\": \"s3:*\",
					\"Resource\": [
						\"arn:aws:s3:::$BUCKET_NAME\",
						\"arn:aws:s3:::$BUCKET_NAME/*\"
					],
					\"Condition\": {
						\"Bool\": {
							\"aws:SecureTransport\": \"false\"
						}
					}
				}
			]
		}"
	
	log_success "S3 bucket configured with security best practices"
}

# =============================================================================
# DynamoDB Table Creation
# =============================================================================

create_dynamodb_table() {
	log_info "Creating DynamoDB table: $DYNAMODB_TABLE"
	
	# Check if table already exists
	if aws dynamodb describe-table --table-name "$DYNAMODB_TABLE" --region "$BUCKET_REGION" >/dev/null 2>&1; then
		log_info "DynamoDB table already exists, skipping creation"
		return 0
	fi
	
	# Create table
	aws dynamodb create-table \
		--table-name "$DYNAMODB_TABLE" \
		--attribute-definitions AttributeName=LockID,AttributeType=S \
		--key-schema AttributeName=LockID,KeyType=HASH \
		--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
		--region "$BUCKET_REGION"
	
	# Wait for table to be active
	log_info "Waiting for DynamoDB table to become active..."
	aws dynamodb wait table-exists \
		--table-name "$DYNAMODB_TABLE" \
		--region "$BUCKET_REGION"
	
	log_success "DynamoDB table created successfully"
}

# =============================================================================
# Generate Configuration
# =============================================================================

show_next_steps() {
	log_success ""
	log_success "🎉 Remote State Backend Resources Created Successfully!"
	log_success "=================================================="
	log_info ""
	log_info "Resources created:"
	log_info "  S3 Bucket: $BUCKET_NAME"
	log_info "  DynamoDB Table: $DYNAMODB_TABLE"
	log_info "  Region: $BUCKET_REGION"
	log_info ""
	log_info "Next steps:"
	log_info "1. Update your infra/terraform/providers.tf with this backend configuration:"
	log_info ""
	echo "terraform {"
	echo "  backend \"s3\" {"
	echo "    bucket         = \"$BUCKET_NAME\""
	echo "    key            = \"infrastructure/terraform.tfstate\""
	echo "    region         = \"$BUCKET_REGION\""
	echo "    encrypt        = true"
	echo "    dynamodb_table = \"$DYNAMODB_TABLE\""
	echo "  }"
	echo "}"
	log_info ""
	log_info "2. Then run: cd infra/terraform && terraform init -migrate-state"
	log_info "3. Test your CI/CD pipeline!"
	log_info ""
	log_warn "💾 IMPORTANT: Save this bucket name somewhere safe!"
	log_warn "   Bucket: $BUCKET_NAME"
	log_info ""
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
	log_info "Starting remote state backend setup for $APP_NAME"
	log_info "Region: $BUCKET_REGION"
	log_info ""
	
	validate_prerequisites
	
	# Show what will be created
	log_info "Planning to create:"
	log_info "  S3 Bucket: $BUCKET_NAME"
	log_info "  DynamoDB Table: $DYNAMODB_TABLE"
	log_info "  Region: $BUCKET_REGION"
	log_info ""
	
	# Confirm before proceeding
	read -p "Continue with resource creation? (y/N): " -n 1 -r
	echo
	if [[ ! $REPLY =~ ^[Yy]$ ]]; then
		log_info "Bootstrap cancelled by user"
		exit 0
	fi
	
	# Check for existing resources
	if ! check_existing_resources; then
		log_error "Some resources already exist. Please check and resolve conflicts."
		exit 1
	fi
	
	# Create resources
	create_s3_bucket
	configure_s3_bucket
	create_dynamodb_table
	
	# Show next steps
	show_next_steps
	
	log_success "Remote state backend bootstrap completed successfully!"
}

# =============================================================================
# Entry Point
# =============================================================================

main "$@"
