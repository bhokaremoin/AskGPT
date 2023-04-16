// import { OpenAI } from "langchain/llms/openai";
// import { PineconeClient } from "@pinecone-database/pinecone";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import * as dotenv from "dotenv";
// import { PineconeStore } from "langchain/vectorstores/pinecone";
// import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { Document } from "langchain/document";
// import * as fs from "fs";
// dotenv.config();
const OpenAI = require("langchain/llms/openai").OpenAI;
const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;
require("dotenv").config();
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const loadQAStuffChain = require("langchain/chains").loadQAStuffChain;
const RecursiveCharacterTextSplitter =
  require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const fs = require("fs");
const qaFun = async (question) => {
  console.log(question);
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
  });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
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
  // const query = "is regression a new development";
  const query = question;
  const docs = await vectorStore.similaritySearch(query, 4);
  // console.log(docs);

  const llmA = new OpenAI();
  const chainA = loadQAStuffChain(llmA);

  const resA = await chainA.call({
    input_documents: docs,
    question: query,
  });
  console.log({ resA });
  // console.log("done");
};
// qaFun("is regression a new development");
module.exports = qaFun;
