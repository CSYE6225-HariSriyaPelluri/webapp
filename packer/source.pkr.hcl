packer {
  required_plugins {
    googlecompute = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

source "googlecompute" "image" {
  project_id   = var.project_id
  image_name   = "centos-image"
  zone         = var.zone
  source_image = "centos-stream-8-v20230509"
  ssh_username = "packer"
}