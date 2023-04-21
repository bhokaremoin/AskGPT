const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGODB_URL;
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
