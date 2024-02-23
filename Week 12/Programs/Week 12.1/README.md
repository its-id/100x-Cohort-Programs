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

## Uploading our app to S3

> Note: By frontend, we mean static HTML, CSS, JS files. We can't deploy a backend or app using server-side rendering (Next.js) to S3.

1. **Build the React App**. Go to the `react-app` directory and run the following command:

```bash
npm run build
```

2. Open the AWS account. Search for S3.

3. Name the bucket and select the region. Click on `Create bucket`.

Scroll to the bottom and click on `Create bucket`.

4. Copy the `dist` folder from the `react-app` directory to the S3 bucket.

5. Once uploaded, we will be able to see the files in the bucket.

## Setting up CloudFront

1. Go to the AWS Management Console and search for CloudFront. Click on `Create Distribution`.

2. In the origin, you can put any url as the source of truth. We will put the S3 bucket url.

> Note: For origin path, put the name of the folder in the S3 bucket where the files are stored.

3. For **Origin Access**, we select `Origin access control settings (recommended)` and create a new OAC.

> Note: By Origin Access, 'Cloudfront' asks for a way to access the files in the S3 bucket. By default, we restricted public access to our bucket.

4. Set the `default root object` to `index.html`.

5. After its creation, we need to put the OAC we get in the S3 bucket's permission.

6. Copy the policy generated, Go to the S3 bucket, click on `Permissions` and `Bucket Policy`. Paste the policy and save it.

7. Once done, Go to the newly created CloudFront distribution page, copy the domain name and paste it in the browser.

And Wallah!! Our app is successfully deployed to AWS S3 and distributed using CloudFront.
