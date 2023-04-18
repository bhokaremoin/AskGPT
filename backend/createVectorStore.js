require("dotenv").config();
const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const RecursiveCharacterTextSplitter =
  require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;
const TranscribeData = require("./models/TranscribeData");
const mongoDB = require("./database");
const createVectorStore = async () => {
  mongoDB(true);
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
  });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
  try {
    const name = "transcribe";
    let res = await TranscribeData.findOne({ name });
    if (!res) {
      console.log("Please Upload the Transcribe to MongoDB");
      console.log("Run getTranscribe.js File");
      return;
    }
    console.log("Transcribe Received Successfully");
    var data = res.transcribe;
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
    console.log("Vector Created Successfully");
  } catch (error) {
    console.log(error);
  }
  mongoDB(false);
};
createVectorStore();
// module.exports = createVectorStore;
