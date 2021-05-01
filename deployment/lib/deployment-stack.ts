import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as targets from '@aws-cdk/aws-route53-targets';

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const domainName: string | undefined = process.env.DOMAIN_NAME;
    if (!domainName) {
      throw Error('Please set the env variable DOMAIN_NAME');
    }

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: domainName,
    });
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + domainName });

    const bucket = new s3.Bucket(this, 'PizzaCalculatorAppBucket', {
      publicReadAccess: true,
      bucketName: domainName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    });
    new cdk.CfnOutput(this, 'Bucket', { value: bucket.bucketName });

    const certificateArn = new acm.DnsValidatedCertificate(
      this,
      'SiteCertificate',
      {
        domainName: domainName,
        hostedZone: zone,
        region: 'us-east-1', // Cloudfront only checks this region for certificates.
      },
    ).certificateArn;
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'PizzaCalculatorAppDistribution',
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [domainName],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            customOriginSource: {
              domainName: bucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    );
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
      zone,
    });

    new s3Deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3Deploy.Source.asset(__dirname + '/../../code/build/')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
