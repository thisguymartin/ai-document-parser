import { RemovalPolicy } from 'aws-cdk-lib'
import { Bucket, StackContext } from 'sst/constructs'

export function DocumentBucketStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, `${stack.stage}DocumentsBucket`, {
    cdk: {
      bucket: {
        bucketName: `${stack.stage}.documents.parser`,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    },
    notifications: {
      invoice: {
        function: {
          handler: 'packages/functions/invoiceIngest.handler',
        },
        events: ['object_created'],
      },
    },
  })

  bucket.attachPermissions([bucket])

  stack.addOutputs({
    BucketName: bucket.bucketName
  })
}
