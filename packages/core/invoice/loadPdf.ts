import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Blob } from 'fetch-blob';

export default async function loadPdf(buff: Buffer): Promise<any> {
  try {
    const blob = new Blob([buff]);
    const loader = new PDFLoader(blob as any);
    const docs = await loader.load()
    return docs
  } catch (error) {
    console.log(error, "Error loading PDF file");
    throw new Error("Error loading PDF file");
  }
}

