variable "project_id" {
  type        = string
  description = "GCP Project ID"
}

variable "image_name" {
  type        = string
  description = "The name of the created machine image"
  default     = "node-centos-image"
}

variable "zone" {
  type        = string
  description = "The zone where the GCP resources will be created"
  default     = "us-central1-a"
}

variable "sql_user" {
  type    = string
  default = "user"
}

variable "sql_password" {
  type    = string
  default = "pass"
}