# Web Application Deployment Guide

Welcome to the `webapp` project. This guide outlines the steps for setting up the project for local development, contributing via forks, and deploying the application to a Digital Ocean droplet.

## Prerequisites

Before you start, ensure you have the following tools installed on your local development environment:

- **Git**: For version control.
- **Node.js**: Preferably the LTS version, as the runtime environment for the application.
- **npm**: For managing Node.js packages.
- **MySQL**: For database management

## Setting Up for Local Development

1. **Clone the Repository**: Since the initial `webapp` repository is empty, start by forking the repository into your own GitHub namespace.

    - Navigate to the `webapp` repository in the GitHub organization.
    - Click on the "Fork" button to create a copy in your account.

2. **Clone Your Fork Locally**:

    ```bash
    git clone git@github.com:ORG_NAME/webapp_fork_name.git
    cd webapp_fork_name
    ```

3. **To Install Dependencies**:

    ```bash
    npm install
    ```

4. **To Run Locally**:

    ```bash
    npm run dev
    ```
5. **To Run Test**:

    ```bash
    npm run test
    ```

## Contributing

1. **Create a Feature Branch** in your fork:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make Changes** and commit them to your branch.

    ```bash
    git commit -am "Add commit message"
    ```

3. **Push Changes** to your GitHub fork:

    ```bash
    git push origin feature/your-feature-name
    ```

4. **Open a Pull Request (PR)** against the main `webapp` repository from your fork on GitHub.

## Preparing for Deployment

After the development is complete:

1. **Ensure the `.gitignore` File Is Updated**: Include node_modules, .env files, and other sensitive/unnecessary files.

2. **Prepare Your Application for Deployment**: Ensure all configurations and environment variables are set correctly.

## Web Application Deployment on Digital Ocean

## Prerequisites

Before you begin, ensure you have:

- A Digital Ocean account.
- A CentOS droplet created in your Digital Ocean account.
- SSH access configured for your droplet. Digital Ocean's documentation provides guidance on [setting up SSH keys](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/).

## Deployment Steps

### Step 1: Connect to Your Droplet

1. **Open a Terminal** on your local machine.
2. **SSH into Your Droplet** using the following command to your desired user:

    ```bash
    ssh -i ~/.ssh/sshKeyPath user@DROPLET_IP
    ```

    Replace `DROPLET_IP` with your droplet's IPv4 address.

### Step 2: Transfer the Application to the Droplet

1. **From your local machine**, use the `scp` command to securely copy the application zip file to your droplet:

    ```bash
    scp -i ~/.ssh/sshKeyPath path/to/webapp-main.zip user@DROPLET_IP:/user
    ```

    Ensure you replace `path/to/webapp-main.zip` with the actual path to your zip file and `DROPLET_IP` with your droplet's IPv4 address.

### Step 3: Set Up the Environment on the Droplet

After connecting to your droplet via SSH, execute the following commands:

1. **Install Unzip** to extract your application files.

    ```bash
    dnf install unzip
    ```

2. **Unzip the Application** in the desired directory.

    ```bash
    unzip webapp-main.zip
    ```

3. **Install MySQL Server** to manage your application's database.

    ```bash
    dnf install mysql-server
    sudo systemctl enable mysqld.service
    sudo systemctl start mysqld.service
    sudo mysql_secure_installation
    ```

4. **Install NVM and Node.js** for running your Node.js application.

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
    ```

## Step 4: Build and Run the Application

1. **Navigate to Your Application Directory** where you've unzipped your application files.

    ```bash
    cd webapp-main
    ```

2. **Install Application Dependencies** using npm.

    ```bash
    npm install
    ```

3. **Configure Your Application** by editing the `.env` file with necessary environment variables like database connection details.

    ```bash
    vi .env
    ```

4. **Optionally, Run Tests** to ensure your application is set up correctly.

    ```bash
    npm run test
    ```

5. **Start Your Application** in development mode.

    ```bash
    npm run dev
    ```

## Step 5: Verify the Application is Running

- Access your application through a tool like `curl` or `Postman` to make requests to your application's endpoints, such as the `healthz` endpoint, to verify it is running correctly.

## Additional Notes

- **Environment Variables**: Make sure to configure your production environment variables appropriately on the droplet.
- **Database Setup**: Configure your RDBMS with the required databases and permissions.
