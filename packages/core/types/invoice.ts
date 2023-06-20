import { z } from "zod";
import {
  StructuredOutputParser,
} from "langchain/output_parsers";

export const structuredOutputParser = StructuredOutputParser.fromZodSchema(
  z.object({
    billingTo: z.string().describe("billing to address"),
    shipTo: z.string().describe("billing ship to address"),
    shippingDate: z.number().describe("billing ship date"),
    invoiceDate: z.string().describe("invoice date"),
    customerNumber: z.string().describe("customer number"),
    items: z
      .array(z.object({
        description: z.string().describe("item description"),
        quantity: z.number().describe("item quantity"),
        unitPrice: z.number().describe("item unit price"),
        amount: z.number().describe("item amount"),
        modelNumber: z.string().describe("item model number"),
      }))
  })
);

