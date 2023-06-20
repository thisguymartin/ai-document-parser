import { z } from "zod"

export const S3vent = z.object({
  eventVersion: z.string(),
  eventSource: z.string(),
  awsRegion: z.string(),
  eventTime: z.string(),
  eventName: z.string(),
  userIdentity: z.object({ principalId: z.string() }),
  requestParameters: z.object({ sourceIPAddress: z.string() }),
  responseElements: z.object({
    "x-amz-request-id": z.string(),
    "x-amz-id-2": z.string()
  }),
  s3: z.object({
    s3SchemaVersion: z.string(),
    configurationId: z.string(),
    bucket: z.object({
      name: z.string(),
      ownerIdentity: z.object({ principalId: z.string() }),
      arn: z.string()
    }),
    object: z.object({
      key: z.string(),
      size: z.number(),
      eTag: z.string(),
      sequencer: z.string()
    })
  })
})


