const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = `mongodb+srv://moinbhokare7:${process.env.MONGODB_PASSWORD}@transcribe-askgpt.hlzxypi.mongodb.net/?retryWrites=true&w=majority`;
const mongoDB = async (flag) => {
  if (flag) {
    await mongoose
      .connect(mongoURL, { useNewUrlParser: true })
      .then(() => {
        console.log("Database Connected Successfully !!");
      })
      .catch((err) => {
        console.log("!! ERROR !!");
        console.log(err);
      });
  } else {
    mongoose.connection.close();
  }
};
module.exports = mongoDB;
