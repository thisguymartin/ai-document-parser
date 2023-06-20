import { structuredOutputParser } from "../types/invoice";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { promises as fs } from 'fs';


export default async function processPdfContent(docs: any): Promise<void> {
  try {

    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0, maxTokens: 2000, modelName: "gpt-3.5-turbo" });

    const formatInstructions = structuredOutputParser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template:
        "Extract billing information from this invoice.\n{format_instructions}\nThe response should be presented in a markdown JSON codeblock.\ Invoice description: {inputText}",
      inputVariables: ["inputText"],
      partialVariables: { format_instructions: formatInstructions },
    });

    console.log({ docs, prompt, formatInstructions })

    const input = await prompt.format({
      inputText: docs[0].pageContent,
    });

    const response = await model.call(input);

    console.log({ response }, "Open AI Response");

    await writeToFile("OpenAiResponse.txt", response);
    await writeToFile("InputPrompt.txt", input);

  } catch (error) {
    console.error(error, "Error processing PDF file");
    throw new Error("Error processing PDF file");
  }
}

async function writeToFile(path, content) {
  try {
    await fs.writeFile(path, content);
    console.info('File written successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}