#!/usr/bin/env bash

# =============================================================================
# NestQL Common Logging Utilities
# =============================================================================
# Shared logging functions and color definitions used across all deployment scripts.
#
# USAGE:
#   source "$(dirname "${BASH_SOURCE[0]}")/common/logging.sh"
#
# FUNCTIONS:
#   log_info MESSAGE    - Log informational message in blue
#   log_warn MESSAGE    - Log warning message in yellow
#   log_error MESSAGE   - Log error message in red to stderr
#   log_success MESSAGE - Log success message in green
# =============================================================================

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
