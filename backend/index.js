import { OpenAI } from "langchain/llms/openai";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import * as dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import * as fs from "fs";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
const pinecone = new PineconeClient();
await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENV,
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
// console.log(pineconeIndex);

// const loader = new TextLoader("transcribe.txt");
// // console.log(loader);
// const docs = await loader.load();
// // console.log(docs);
var data = fs.readFileSync("../transcribe/transcribe.txt", {
  encoding: "utf8",
});
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 1,
});
const docOutput = await splitter.splitDocuments([
  new Document({ pageContent: data }),
]);
await PineconeStore.fromDocuments(docOutput, new OpenAIEmbeddings(), {
  pineconeIndex,
});
const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);
const query = "is regression a new development";
// // /* Search the vector DB independently with meta filters */
const docs = await vectorStore.similaritySearch(query, 4);
// console.log(results);

const llmA = new OpenAI({});
const chainA = loadQAStuffChain(llmA);

const resA = await chainA.call({
  input_documents: docs,
  question: "is regression a new development",
});
console.log({ resA });
