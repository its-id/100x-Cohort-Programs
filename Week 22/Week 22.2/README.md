## Which Scaling method should we use?

- If we have multi-core machines, vertical scaling doesn't make sesnse.
- If we want to implement Load Balancers and distribute the load, we should **go for horizontal scaling**.
- Horizontal scaling is more cost-effective and efficient. We can **autoscale the servers based on the traffic**.
- Today's session is to understand how to implement horizontal scaling using AutoScaling Groups.

---

## Types of Auto Scaling Implementation Design

1. **Adhoc Scaling**: In these systems, we own the logic for autoscaling.

2. **Queue Based Scaling**: In these systems, we scale based on size of the queue.

### Some Things to Consider

- Today Autoscaling usually happens using containers.
- AWS calls this service as **Auto Scaling Groups (ASGs)**.
- This machine needs to have the code to run the server.

### Some BUZZ Words

- **AMI**: Amazon Machine Image

  - It is a snapshot of the machine.
  - From this, we can create multiple instances.
  - This snapshot is what we give to the ASGs.

- **Load Balancers**:

  - They distribute the load across multiple servers.
  - They are the entry point for the traffic.
  - The hold the logic to route the traffic to the various machines.
  - We can also do the proxy service method if we want, but we usually would want to defer this to AWS Load Balancers from scaling perspective.

- **Target Groups**:

  - AWS Specific service.
  - It is a group of servers that are behind the Load Balancer.
  - The Load Balancer routes the traffic to the Target Groups.

- **Launch Templates**:
  - It is a template to launch new instances.
  - **Diff b/w image and template**: It has the configuration of the instance while Image only stores the code snapshot of the machine.
  - We can specify the AMI, instance type, security groups, keypair, launch commands etc.

**Note**: Make sure to delete the ASG created and not just the instances as they will get restarted if the ASG is still there.

---

## Deploying ASGs

1. Go to AWS and create an instance using instructions [here](https://github.com/its-id/100x-Cohort-Programs/tree/master/Week%2011/Programs/Week%2011.2).

<br>

2. Change the permissions using the following command:

   ```bash
   chmod 700 <key.pem>
   ```

   <br>

3. SSH into the instance using the following command:

   ```bash
   ssh -i <key.pem> ec2-user@<public-ip>
   ```

<br>

4. Clone the repository using the following command:

   ```bash
   git clone https://github.com/its-id/100x-Cohort-Programs
   ```

<br>

5. Install Node.js in the instance using nvm ([here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-installing-node-using-the-node-version-manager)).

   > Note: Make sure to install v22.0.0 for later steps.

<br>

6. Go to `/Week 22/Week 22.2/node-app` and run the following command:

   ```bash
   cd Week\ 22/Week\ 22.2/node-app/
   npm install
   ```

<br>

7. Go to the Instance Listing, select the Instance and click on `Actions` -> `Image and Templates` -> `Create Image`.

<br>

8. Go to `Security Groups` and add a new rule for `Custom TCP` with port `3000`.

<br>

9. Next, we create the **Launch Template** so that we can launch the instances using the template next time without having to configure it again.

   - Go to `Launch Templates` and click on `Create Launch Template`.
   - Give it a name and description.
   - Choose the AMI created.
   - Choose the instance type.
   - Choose the keypair.
   - Select the security group.
   - Now, we need to add the User Data. This is the script that will run when the instance is launched.
   - Add the following script:

     ```bash
     #!/bin/bash
     export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.0.0/bin/
     echo "hi there before"
     echo "hi there after"
     npm install -g pm2
     cd /home/ubuntu/week-22
     pm2 start index.js
     pm2 save
     pm2 startup
     ```

     You can check if above version of Node.js is in path using below command:

     ```bash
     ls /home/ubuntu/.nvm/versions/node/v22.0.0/
     ```

   - Click on `Create Launch Template`.

   <br>

   <p align="center"><b>Congratulations 🎉! You have created the Launch Template. Summary of steps so far:</b></p>

   <br>

10. Now, we create the Auto Scaling Group.

    - Go to `Auto Scaling Groups` and click on `Create Auto Scaling Group`.

    - Give it a name and description.

      > **Note**: We can setup versions in ASGs too with edits in image, launch template based on changes in the instances and rollback if needed.

    - Choose the Launch Template created.

    - Choose the VPC and Subnet. You can select multiple subnets to launch the instances in different availability zones but should stick to one because of termination issues.

    - Choose the Load Balancer. In our case, we do need one since its an HTTP request.
      - Choose the option `Attach to a new load balancer`.
      - Choose type `Application Load Balancer`.
      - Choose Load Balancer Scheme as `Internet-facing`.
      - We will be needing a target group to whom Load Balancer will send the traffic.
      - Choose `Create a target group` if don't already have one.
      - Rest of the settings can be left as default.
    - Review and Click on `Create Auto Scaling Group`.

<p align="center"><b>Congratulations 🎉! you have created the Auto Scaling Group. You can check the instances running in the `Instance Management` tab.</b></p>

<p align="center">Check a sample deployed ASG Load Balancer 👉  <a href="http://lb.100xdevs.com/api/1">here.</a></p>

<br>

**Note**: To fix the issue of target groups showing `unhealthy`, this may be probably because of wrong PORT issues.

- Try creating a new Target Group, this time with the correct port (3000).
- Go to your Auto Scaling Group created -> under `Load Balancing` section -> update the target group to the new target group created.
- Go to Load Balancer created -> select the `Listener` with wrong port mapping -> `Edit rule` -> Update the target group.

<br>

> More Formal Tutorial on deploying ASGs can be found [here](https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorials-auto-scaling-group.html)

---

## Mapping the Load Balancer to the Domain

1. Go to your Load Balancer you created.

2. Go to the `Listeners` tab and check the port mapping.

3. Go to the `Target Groups` tab and check the target group.

4. To map the Load Balancer to the domain, we need to get a certificate for the Load Balancer URL. We can get a free certificate from [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)

5. Go to the AWS Certificate Manager and click on `Request a certificate`.

6. Add the domain name you want to map to the Load Balancer.

7. Choose the validation method as `DNS Validation`.

8. Click on `Review` and `Confirm and request`.

9. Go to the `Description` tab and copy the `DNS Name`.

10. Go to your domain provider and create a new `CNAME` record with the `DNS Name` copied.

---

### Experimening with the ASG

1. To apply autoscaling based on the traffic, we can use:

   - Play the desired capacity and the minimum and maximum capacity in the ASG settings.

   - Dynamic Scaling Policies.
     **Quick Hack**: In order to get the latest changes from Github on your ASG, First Decrease the desired capacity to 0, then increase it back to the desired capacity.

   <br>

2. Simulate a scale up by running a CPU intensive task in your node.js app:

   ```js
   while (1) {
     console.log('running');
   }
   ```

   <br>

3. To check the logs of the automating scaling events, go to the `Activity` tab in the ASG.

---

## Cleanup in following order

1. Delete the Auto Scaling Group.
2. Delete the Load Balancer.
3. Delete the Launch Template.
4. Delete the Target Group.
5. Delete the AMI.
6. Delete the Instances.
7. Delete your VPC.
