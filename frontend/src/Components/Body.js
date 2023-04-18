import React, { useState } from "react";
// import "../styles/body.css";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
const Body = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [gotAnswer, setGotAnswer] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/getAnswer", {
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
      setGotAnswer(true);
    }
  };
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <div>
      <div className="container-fluid">
        <input
          className="input-area"
          id="outlined-textarea"
          label="Ask Question"
          placeholder="Example: What is Regression Testing ? "
          multiline
          value={question}
          onChange={handleChange}
        />
        {loading ? (
          <button className="btn-primary" disabled>
            Loading
          </button>
        ) : (
          <button className="btn" variant="contained" onClick={handleSubmit}>
            Get Answer
          </button>
        )}
        <p className="text-area">{gotAnswer && answer}</p>
      </div>
    </div>
  );
};

export default Body;
