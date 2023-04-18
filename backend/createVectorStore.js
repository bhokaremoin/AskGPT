const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;
require("dotenv").config();
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const RecursiveCharacterTextSplitter =
  require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const fs = require("fs");
const createVectorStore = async () => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
  });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
  var data = fs.readFileSync("transcribe.txt", {
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
  console.log("VectorStore Created Successfully !");
};
createVectorStore();
