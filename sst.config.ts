import { SSTConfig } from "sst";
import { DocumentBucketStack } from "./stacks/documentBucketStack";
import { RemovalPolicy } from 'aws-cdk-lib'

export default {
  config(_input) {
    return {
      name: "ai-document-parser",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
    app.setDefaultFunctionProps({
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
      },
    });
    app.stack(DocumentBucketStack);
  }
} satisfies SSTConfig;
