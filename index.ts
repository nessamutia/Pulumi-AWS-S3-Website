import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const siteDir = config.require("siteDir"); // Directory containing the website content

// Create an S3 bucket to hold the website content
const siteBucket = new aws.s3.Bucket("siteBucket", {
    website: {
        indexDocument: "index.html",
        errorDocument: "error.html",
    },
});

// Upload the files to the S3 bucket
const filesToUpload = [
    { fileName: "index.html", contentType: "text/html" },
    { fileName: "error.html", contentType: "text/html" },
    { fileName: "profile.gif", contentType: "image/gif" },
];

filesToUpload.forEach(file => {
    new aws.s3.BucketObject(file.fileName, {
        bucket: siteBucket,
        source: new pulumi.asset.FileAsset(`${siteDir}/${file.fileName}`),
        contentType: file.contentType,
    });
});

// Create a bucket policy to allow public read access to all objects
new aws.s3.BucketPolicy("bucketPolicy", {
    bucket: siteBucket.bucket, // Reference the bucket created earlier
    policy: siteBucket.bucket.apply(bucketName => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
        }],
    })),
});

// Ensure public access block is not enabled
new aws.s3.BucketPublicAccessBlock("siteBucketPublicAccessBlock", {
    bucket: siteBucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
});

// Export the bucket name and website URL
export const bucketName = siteBucket.bucket;
export const websiteUrl = siteBucket.websiteEndpoint;
