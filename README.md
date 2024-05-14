# Static Website Deployment using Pulumi and AWS

This project demonstrates how to deploy a static website to AWS S3 using Pulumi, an Infrastructure as Code (IaC) tool. The website content is hosted in an S3 bucket configured for website hosting, with public access enabled.

## Prerequisites

Before you start, ensure you have the following:

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/) installed.
- An AWS account with the necessary permissions to create S3 buckets and manage policies.
- [AWS CLI](https://aws.amazon.com/cli/) configured with your AWS credentials.
- Node.js and npm installed.

## Pulumi Program (index.ts)

The Pulumi program accomplishes the following tasks:

1. Create an S3 Bucket: Set up an S3 bucket with website hosting configuration.

2. Upload Website Files: Upload index.html, error.html, and profile.gif to the S3 bucket.

3. Set Bucket Policy: Configures the bucket policy to allow public read access to all objects in the bucket.

4. Configure Public Access Block: Ensures public access block settings do not interfere with the website accessibility.

5. Export Bucket Name and Website URL: Exports the bucket name and website endpoint URL as stack outputs.
