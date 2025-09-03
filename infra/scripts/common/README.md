# NestQL Common Utilities

This directory contains shared utility scripts used across all NestQL deployment scripts. These utilities provide consistent functionality for logging, validation, AWS operations, and more.

## Files

### `init.sh`
Main initialization script that sources all other common utilities. Use this in your scripts:
```bash
source "$(dirname "${BASH_SOURCE[0]}")/../common/init.sh"
```

### `logging.sh`
Provides colored logging functions:
- `log_info "message"` - Blue informational messages
- `log_warn "message"` - Yellow warning messages  
- `log_error "message"` - Red error messages (to stderr)
- `log_success "message"` - Green success messages

### `constants.sh`
Shared constants:
- `REGION` - AWS region (defaults to us-east-1)
- `APP_NAME` - Application name ("nestql")

### `validation.sh`
Validation utilities:
- `check_command "cmd" "description"` - Check if command exists
- `validate_commands ("cmd1:desc1" "cmd2:desc2")` - Validate multiple commands
- `validate_environment_var "VAR_NAME" min_length "description"` - Validate env vars

### `terraform.sh`
Terraform utilities:
- `get_terraform_output "output_name"` - Get Terraform output value
- `validate_terraform_state` - Check if Terraform state exists

### `aws.sh`
AWS utilities:
- `validate_aws_credentials` - Check AWS credentials are configured
- `get_ecs_service_status "cluster" "service"` - Get ECS service status
- `show_recent_logs [minutes]` - Show recent CloudWatch logs

### `git.sh`
Git utilities:
- `get_git_commit_hash [short]` - Get current commit hash
- `get_current_branch` - Get current git branch name
- `get_commit_message` - Get current commit message
- `validate_git_status [auto_approve]` - Check git status and warn about uncommitted changes

### `args.sh`
Argument parsing utilities:
- `show_standard_help "title" "desc" "usage" "options" "examples"` - Show standardized help
- `parse_common_flags "$@"` - Parse common flags like --help, --auto-approve

## Usage Example

Here's how to use the common utilities in a deployment script:

```bash
#!/usr/bin/env bash

# Initialize common utilities (this sets up everything)
source "$(dirname "${BASH_SOURCE[0]}")/../common/init.sh"

# Now you can use all the functions
log_info "Starting deployment..."

# Validate prerequisites
validate_commands ("aws:AWS CLI" "docker:Docker" "terraform:Terraform")

# Get infrastructure details
readonly CLUSTER_NAME="$(get_terraform_output ecs_cluster_name)"

# Validate git status
validate_git_status "$AUTO_APPROVE"

# Show recent logs
show_recent_logs 5

log_success "Deployment completed!"
```

## Benefits

- **Consistency**: All scripts use the same logging format and colors
- **DRY**: No more duplicate code across scripts
- **Maintainability**: Fix a bug once in common utilities, not in every script
- **Extensibility**: Easy to add new shared functionality
- **Testing**: Common utilities can be tested independently

## Migration

To migrate an existing script:

1. Replace the header with: `source "$(dirname "${BASH_SOURCE[0]}")/../common/init.sh"`
2. Remove duplicate logging functions, constants, and utilities
3. Replace custom implementations with common utility calls
4. Test that the script still works as expected

The refactored scripts should have significantly less code while maintaining the same functionality.
