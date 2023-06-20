
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export default async function downloadPdfFromS3(bucketName: string, fileName: string): Promise<any> {
  try {
    const fileStream = await s3.getObject({
      Bucket: bucketName,
      Key: fileName,
    }).promise();

    const fileContent = fileStream.Body as Buffer;
    return fileContent;
  } catch (error) {
    console.log(error, "Error downloading the file from S3");
    throw new Error("Error downloading the file from S3");

  }
}


