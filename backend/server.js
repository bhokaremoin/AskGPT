const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./database");
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Reuested-With, Content-Type, Accept"
  );
});
app.use(express.json());
app.use("/api", require("./Routes/api"));
app.get("/", (req, res) => {
  res.send("Backend Server for AskGPT Application");
});
app.listen(port, () => {
  console.log(`Server Running at Port ${port}..`);
});