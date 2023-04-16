import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
const Body = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/getAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    });
    const data = await response.json();
    if (!data.success) {
      alert("Something Went Wrong!\nTry Again");
    } else {
      setAnswer(data.answer);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <div>
      <div>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            value={question}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Contained
          </Button>
        </Box>
        <Typography variant="body1" gutterBottom>
          {answer}
        </Typography>
      </div>
    </div>
  );
};

export default Body;
