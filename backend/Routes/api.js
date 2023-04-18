const express = require("express");
const router = express.Router();
const qaFun = require("../getAnswers.js");

router.post("/getAnswer", async (req, res) => {
  let question = req.body.question;
  try {
    const ans = await qaFun(question);
    res.send({ success: true, answer: ans });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
