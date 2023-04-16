const express = require("express");
const router = express.Router();
const qaFun = require("../index.js");

router.post("/getAnswer", async (req, res) => {
  let question = req.body.question;
  const ans = qaFun(question);
  console.log(ans);
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
