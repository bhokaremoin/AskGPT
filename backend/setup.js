require("dotenv").config();
const mongoDB = require("./database");
const getAudio = require("./transcriptSetup/getAudio");
const compressAudio = require("./transcriptSetup/compressAudio");
const getTranscribe = require("./transcriptSetup/getTranscribe");
const createVectorStore = require("./transcriptSetup/createVectorStore");
const setup = async () => {
  mongoDB(true);
  await getAudio();
  await compressAudio();
  const props = {
    openai_api_key: process.env.OPENAI_API_KEY,
    pinecone_api_key: process.env.PINECONE_API_KEY,
    pinecone_env: process.env.PINECONE_ENV,
    pinecone_index: process.env.PINECONE_INDEX,
  };
  await getTranscribe(props);
  await createVectorStore(props);
  console.log("Transcript setup Completed !!");
  mongoDB(false);
};
setup();
