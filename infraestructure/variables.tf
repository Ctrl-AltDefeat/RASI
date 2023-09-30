variable "deploy_state" {
  description = "The state of deployment 'RUNNING | TERMINATED'"
  type        = string
  validation {
    condition     = var.deploy_state == "RUNNING" || var.deploy_state == "TERMINATED"
    error_message = "Value is not either RUNNING or TERMINATED"
  }
}
