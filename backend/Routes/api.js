const express = require("express");
const router = express.Router();

router.post("/getAnswer", async (req, res) => {
  let question = req.body.question;
  try {
    // let data = ;
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
