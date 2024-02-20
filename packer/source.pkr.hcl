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
  image_name          = var.image_name
  zone                = var.zone
  source_image        = var.source_image
  source_image_family = var.image_family
  ssh_username        = var.ssh_user
}