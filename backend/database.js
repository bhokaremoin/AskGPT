const mongoose = require("mongoose");
const mongoURL = "";
const mongoDB = async () => {
  await mongoose.connect({ useNewUrlParser: true }, async (err, result) => {
    if (err) {
      console.log("!! ERROR !!");
      console.log(err);
    } else {
      console.log("Database Connected Successfully !!");
    }
  });
};
module.exports = mongoDB;
