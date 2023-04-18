require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const path = require("path");
async function transcribe() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fs.createReadStream("audio1.mp3"),
    "whisper-1"
  );
  console.log(resp.data.text);
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
}
saveFile();
