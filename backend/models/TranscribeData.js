const mongoose = require("mongoose");
const { Schema } = mongoose;
const TranscribeDataSchema = new Schema({
  transcribe: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transcribeData", TranscribeDataSchema);
