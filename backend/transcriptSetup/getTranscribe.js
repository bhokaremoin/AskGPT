const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const TranscribeData = require("../models/TranscribeData");
async function transcribe(key) {
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fs.createReadStream("transcriptSetup/compressedAudio.mp3"),
    "whisper-1"
  );
  return resp.data.text;
}
async function uploadFile(props) {
  return new Promise(async (resolve, reject) => {
    const jsonContent = await transcribe(props.openai_api_key);
    const jsonString = JSON.stringify(jsonContent);
    fs.writeFile("transcriptSetup/transcript.txt", jsonString, function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        reject();
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
        }).then(() => {
          console.log("Transcript Uploaded On Database");
          resolve();
        });
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
        )
          .then(() => {
            console.log("Transcribe Updated Successfully !");
            resolve();
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = uploadFile;
