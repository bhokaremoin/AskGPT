require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const TranscribeData = require("./models/TranscribeData");
const mongoDB = require("./database");
mongoDB(true);
async function transcribe() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fs.createReadStream("compressedAudio.mp3"),
    "whisper-1"
  );
  // console.log(resp.data.text);
  return resp.data.text;
}
async function saveFile() {
  const jsonContent = await transcribe();
  const jsonString = JSON.stringify(jsonContent);
  fs.writeFile("transcribe.txt", jsonString, function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
  try {
    const name = "transcribe";
    let data = await TranscribeData.findOne({ name });
    if (!data) {
      await TranscribeData.create({
        name: name,
        transcribe: jsonString,
      }).then(console.log("Transcript Uploaded On Database"));
    } else {
      await TranscribeData.findOneAndUpdate(
        {
          name: name,
        },
        {
          $set: {
            transcribe: jsonString,
          },
        }
      ).then(console.log("Transcribe Updated Successfully !"));
    }
  } catch (error) {
    console.log(error);
  }
  mongoDB(false);
}
saveFile();
