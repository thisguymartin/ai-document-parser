import { S3Handler } from "aws-lambda";
import downloadPdfFromS3 from "../core/invoice/downloadPdfFromS3";
import loadPdf from "../core/invoice/loadPdf";
import processPdfContent from "../core/invoice/processPdfContent";


export const handler: S3Handler = async (event) => {
  for await (const record of event.Records) {
    try {
      console.log(record, "record.s3.bucket.name, record.s3.object.key");
      const s3Document = await downloadPdfFromS3(record.s3.bucket.name, record.s3.object.key);
      if (!s3Document) {
        console.log("s3Document is empty");
        throw new Error("s3 document is empty");
      }

      const pdfDoc = await loadPdf(s3Document);
      if (!pdfDoc) {
        console.log("pdfDoc is empty");
        throw new Error("pdf document is empty");
      }

      await processPdfContent(pdfDoc);

    } catch (error) {
      console.error(error, record);
    }
  }
}
