const mongoose = require("mongoose");
const { Schema } = mongoose;
const TranscribeDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  transcribe: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transcribeData", TranscribeDataSchema);
