import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class DeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'PizzaCalculatorAppBucket', {
      bucketName: 'pizzacalculator.net',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: true,
        ignorePublicAcls: true,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
    });

    new cdk.CfnOutput(this, 'Bucket', { value: bucket.bucketName });
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: bucket.bucketWebsiteUrl,
    });

    new s3Deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3Deploy.Source.asset(__dirname + '/../../code/build/')],
      destinationBucket: bucket,
    });
  }
}
