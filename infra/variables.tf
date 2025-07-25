variable "app_name" {
  description = "The name of the application."
  type        = string
  default     = "ntpql"
}

variable "environment" {
  description = "Deployment environment."
  type        = string
  default     = "prod"
}

variable "db_username" {
  description = "RDS database username."
  type        = string
  default     = "ntpql"
}

variable "db_password" {
  description = "RDS database password."
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "RDS database name."
  type        = string
  default     = "ntpql"
}

variable "session_secret" {
  description = "Session secret for the app."
  type        = string
  sensitive   = true
} 