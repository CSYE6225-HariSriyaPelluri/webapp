#!/bin/bash

# Create a local user
set -e

sudo useradd -s /usr/sbin/nologin csye6225

# Update package repositories
sudo dnf update -y

# Add the NodeSource repository for Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -

# Install Node.js and npm
sudo dnf install -y nodejs unzip

# Verify installation
node --version

# Install Ops Agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Create log directory and file for the web application
sudo mkdir -p /var/log/webapp/
#sudo touch /var/log/webapp/webapp.log

# Set permissions for the log file
sudo chown csye6225:csye6225 /var/log/webapp/

# Specify the logging configuration to add
LOGGING_CONFIG="logging:
  receivers:
    my-webapp-receiver:
      type: files
      include_paths:
        - /var/log/webapp/webapp.log
      record_log_file_path: true
  processors:
    my-webapp-processor:
      type: parse_json
      time_key: timestamp
      time_format: '%Y-%m-%dT%H:%M:%S.%L%z'
  service:
    pipelines:
      default_pipeline:
        receivers: [my-webapp-receiver]
        processors: [my-webapp-processor]"

# Add the logging configuration to the Ops Agent configuration file
echo "$LOGGING_CONFIG" | sudo tee -a /etc/google-cloud-ops-agent/config.yaml > /dev/null

# Restart the Google Cloud Operations Agent service
sudo systemctl restart google-cloud-ops-agent

# Copy application artifacts
sudo mkdir -p /home/csye6225/webapp/webapp_develop/
sudo unzip /tmp/webapp -d /home/csye6225/webapp/webapp_develop/
sudo npm install --prefix /home/csye6225/webapp/webapp_develop/

# Set ownership of application files to the newly created user
sudo chown -R csye6225:csye6225 /home/csye6225/webapp/

# Show ownership of the artifacts
sudo ls -al /home/csye6225/webapp/webapp_develop/

# Create systemd service file
sudo cp /home/csye6225/webapp/webapp_develop/runappdefault.service /etc/systemd/system/runappdefault.service

# Enable and start the systemd service
sudo systemctl start runappdefault
sudo systemctl enable runappdefault

# Reload systemd to load new service file

sudo systemctl daemon-reload