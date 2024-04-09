build {
  sources = [
    "source.googlecompute.image"
  ]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    script = "./startapp.sh"
    environment_vars = [
      "SQL_USER=${var.sql_user}",
      "SQL_PASSWORD=${var.sql_password}"
    ]
  }

  post-processor "manifest" {
    output = "./image_manifest.json"
  }
}
