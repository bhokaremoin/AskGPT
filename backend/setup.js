const getAudio = require("./getAudio");
const compressAudio = require("./compressAudio");
const getTranscribe = require("./getTranscribe");
const createVectorStore = require("./transcribe/createVectorStore");

const setup = async () => {
  try {
    await getAudio().then(await compressAudio);
    // await getTranscribe();
    // await createVectorStore();
  } catch (err) {
    console.log(err);
  }
};
setup();
