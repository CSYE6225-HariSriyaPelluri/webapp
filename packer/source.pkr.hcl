packer {
  required_plugins {
    googlecompute = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

source "googlecompute" "image" {
  project_id          = var.project_id
  image_name          = "${var.image_name}-${formatdate("YYYY-MM-DD-hh-mm-ss", timestamp())}"
  zone                = var.zone
  source_image_family = var.source_image_family
  image_family        = var.image_family
  ssh_username        = var.ssh_user
}