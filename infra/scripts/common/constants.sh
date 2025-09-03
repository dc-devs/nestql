#!/usr/bin/env bash

# =============================================================================
# NestQL Common Constants
# =============================================================================
# Shared constants used across deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/constants.sh"
#
# CONSTANTS:
#   REGION    - AWS region (defaults to us-east-1)
#   APP_NAME  - Application name
# =============================================================================

# AWS region (can be overridden by AWS_REGION environment variable)
readonly REGION="${AWS_REGION:-us-east-1}"

# Application name
readonly APP_NAME="nestql"
