# Deploying on AWS

## What is AWS?

In simple words, it is a cloud services provider. We can get a remote server from here.

<!-- image here -->

## 1. How to get the EC2 instance?

1. Create an account on AWS. (a credit card is required).
2. Search EC2 in the search bar.
3. Once in the dashboard, Click on "Launch Instance" button.
4. Fill in the fields:

   - Choose an Amazon Machine Image (AMI). Here we are selecting `Amazon Linux 2023 AMI` (eligible for free tier)
   - Choose an Instance Type (t2.micro for minimum cost)
   - Create your seperate key pair (download the .pem file). This is used for a secure connection between your computer and the server.

   - Inside Network Settings, we create a security group with following settings:

     - Allow SSH (port 22) from anywhere
     - Allow HTTP (port 80) for everyone
     - Allow HTTPS (port 3000) for everyone

   - Review and Launch

5. Check back on the EC2 dashboard, you will see your instance running.

## 2. How to connect to the EC2 instance?

1. Open your terminal and navigate to the directory where your .pem file is located.
2. Run the following command to change the permissions of the .pem file:

   ```bash
    chmod 700 your-key-pair.pem
   ```

   > **For Windows**, check this [discussion](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open) or install [putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html).

   <details>
    <summary>Explaining the above command</summary>

   - `chmod` is a command used to change the permissions of a file or directory.

   - `700` is the permission code. It means that the owner can **read, write and execute** the file, but no one else can do anything with it.
   </details>

3. Now, you can connect to the instance using the following command:

   ```bash
    ssh -i "your-key-pair.pem" xxxxxxxx@xxxxxxxxxxxxxx
   ```

   where `your-key-pair.pem` is the name of your .pem file and xxxxxxxxx@xxxxxxxxxxxxxxx is the public DNS of your instance.

   **To see the public DNS**

   - Click on your instance in the EC2 dashboard.

   - Click on `Connect` button on top.

   - Navigate to the `SSH Client` tab. There you will see the example command, either copy the whole command or just the public DNS part.


## 3. How to deploy your application on the EC2 instance?

1. Once you are connected to the instance, run the following commands:

   ```bash
    sudo yum update -y
    sudo yum install git -y
    git clone https://github.com/its-id/100x-Cohort-Programs.git
    cd 100x-Cohort-Programs/Week\ 11/Programs/Week\ 11.2
    sudo yum install nodejs -y
    sudo yum install npm -y
    npm install
    node index.js
   ```

   where `https://github.com/its-id/100x-Cohort-Programs.git` is the url of this repository, you can replace it with your own repository url and cd into your own directory.
