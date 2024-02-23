# Deploying Frontends to AWS

## Introduction

When deploying an app, mostly two things are needed to be handled:

1. Distribution
2. Storage

## What is AWS S3?

A cloud storage service which handles the storage of large media/static files.

## What is AWS CloudFront?

Content Delivery Network (CDN) by AWS which handles the distribution of media/static files.
We need it cause distributing files from a single server can be slow and expensive.

## Uploading our App to S3

> Note: By frontend, we mean static HTML, CSS, JS files. We can't deploy a backend or app using server-side rendering (Next.js) to S3.

1. **Build the React App**. Go to the `react-app` directory and run the following command:

   ```bash
   npm run build
   ```

2. Open the AWS account. Search for S3.

3. Name the bucket and select the region. Click on `Create bucket`.
   <img width="500" alt="Screenshot 2024-02-23 at 7 43 31 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/c0b10730-ff7b-469a-b29d-1fcf27938b59">

   Scroll to the bottom and click on `Create bucket`. <br>
   <img width="500" alt="Screenshot 2024-02-23 at 7 45 26 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/727f1026-b55c-472c-bf02-3127824f417a">

4. Copy the `dist` folder from the `react-app` directory to the S3 bucket.

5. Once uploaded, we will be able to see the files in the bucket.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 7 52 24 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/894901c5-db75-4b59-a0be-c38bad6ad29f">

<hr/>

## Setting up CloudFront

1. Go to the AWS Management Console and search for CloudFront. Click on `Create Distribution`.

2. In the origin, you can put any url as the source of truth. We will put the S3 bucket url.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 7 56 50 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/9545f879-2d42-450d-8435-1f087e8cb939">

> Note: For origin path, put the name of the folder in the S3 bucket where the files are stored.

3. For **Origin Access**, we select `Origin access control settings (recommended)` and create a new OAC.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 06 06 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/b036c509-2d3a-4359-8077-1ccfdbea8ceb">

> Note: By Origin Access, 'Cloudfront' asks for a way to access the files in the S3 bucket. By default, we restricted public access to our bucket.

4. Set the `default root object` to `index.html`. <br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 10 59 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/470007e2-94dc-468a-9e15-e7c5f48c6b2c">

5. After its creation, we need to put the OAC we get in the S3 bucket's permission.

6. Copy the policy generated, Go to the S3 bucket, click on `Permissions` and `Bucket Policy`. Paste the policy and save it.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 12 21 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/6bbea1de-5ca5-4525-9c8d-68b19921bec7"><br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 13 54 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/c9be8135-a2e4-411a-bc09-8d87d9a82c5d">

7. Once done, Go to the newly created CloudFront distribution page, copy the domain name and paste it in the browser.

### <p align="center">And Wallah 🎉</p>

<p align="center">
<img width="500" alt="Screenshot 2024-02-23 at 8 36 51 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/281c7f31-b96a-4b28-ba07-d5e21261e7e5"> </p>

<p align="center">Our app is successfully deployed to AWS S3 and distributed using CloudFront
</p>

<hr/>

## Connecting a Custom Domain

1. In the newly created CloudFront distribution page, click on `Edit`.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 40 37 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/ff1892d5-7cfa-4532-9fc7-3f656fc9ac8d">

2. Add the domain name you own in the `Alternate Domain Names (CNAMEs)` field.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 42 06 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/daf649af-b483-4f03-b96b-f2e3e04667c9">

**Some Important Points**:

- If we want our final website to be deployed on HTTPS, we need to have an SSL certificate.
- Amazon can't create a certificate for any random domain.
- For amazon to create a certificate, we need to prove that we own the domain.
- Two ways to create a certificate:
  - Use Amazon's Certificate Manager.
  - Use a third-party certificate and upload it to Amazon.

3. Once domain is added, request for a certificate from Amazon Certificate Manager (ACM).

4. Go to the ACM page and click on `Request a certificate`.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 55 12 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/996702d5-59dc-4d4e-8f1d-451195858146">

5. Once requested, to approve the status of the certificate, we need to add the CNAME record generated in the DNS settings of our domain hosting manager.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 8 57 36 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/afc560ce-7083-4e62-8029-4372cb1aeec8"><br>
   <img width="500" alt="Screenshot 2024-02-23 at 9 03 39 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/f59d6ac8-721c-443c-8c51-9b085a48939c">

6. After its done, AWS will verify the certificate and it will be issued.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 9 06 59 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/9dbf922b-c060-4506-998a-acf5b3103b9d">
   <img width="500" alt="Screenshot 2024-02-23 at 9 09 16 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/e155a799-8288-4f4a-b55f-aa9eb15f9b0f">

7. But, an **important step**. In order for our custom domain to work, we need to **add the CloudFront distribution domain** to the DNS settings of our domain hosting manager.<br>
   <img width="500" alt="Screenshot 2024-02-23 at 9 12 27 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/7ace1ac8-cd85-476e-a08d-e48a69777276">

<p align="center"><b>and there we go!</b> 🎉</p>

<p align="center"></p>

<p align="center">Our custom domain now points to the CloudFront distribution.
</p>

### Last thing: Error Pages.

If we try to access any route other than the root, we get an error. To fix this, we need to add error pages to our cloudfront distribution. For now, we want to point all the errors to the root of our app.

1. Go to the CloudFront distribution page and click on `Error Pages`.<br>

2. Create an error page response for 404 and 403 errors. Set the response page path to `/index.html`.<br>

3. Also add invalidation to the CloudFront distribution which clears the cache and updates the files.<br>

