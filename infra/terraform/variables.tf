variable "app_name" {
  description = "The name of the application."
  type        = string
  default     = "nestql"
}

variable "environment" {
  description = "Deployment environment."
  type        = string
  default     = "production"
}

variable "db_username" {
  description = "RDS database username."
  type        = string
  default     = "nestql"
}


variable "db_name" {
  description = "RDS database name."
  type        = string
  default     = "nestql"
}


variable "domain_name" {
  description = "Root domain managed in Route53 (e.g., dc-devs.com)."
  type        = string
}

variable "api_subdomain" {
  description = "Subdomain for the API (e.g., api)."
  type        = string
  default     = "api"
}

variable "ecs_desired_count" {
  description = "Number of ECS tasks to run. Start with 0; set to 1 after secrets are populated."
  type        = number
  default     = 0
}

variable "mastra_db_name" {
  description = "Additional database name for Mastra on the same RDS instance."
  type        = string
  default     = "mastra"
}

# ============================================================================
# Netlify Configuration
# ============================================================================

variable "netlify_app_domain" {
  type        = string
  description = "Your Netlify app domain (from Netlify dashboard)"
  default     = "resplendent-bubblegum-0142bc.netlify.app"
}

variable "netlify_load_balancer" {
  type        = string
  description = "Netlify's apex load balancer domain"
  default     = "apex-loadbalancer.netlify.com"
}


