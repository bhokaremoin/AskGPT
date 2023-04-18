// require()
const mongoDB = require("./database");
const fs = require("fs");
const TranscribeData = require("./models/TranscribeData");
mongoDB();
var data = fs.readFileSync("../transcribe/transcribe.txt", {
    encoding: "utf8",
});

try{
    let data = await TranscribeData.find()
}