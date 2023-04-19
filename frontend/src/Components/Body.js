import React, { useState } from "react";
import { ReactComponent as Svg } from "./Spinner.svg";
import "../styles/style.css";
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
      setGotAnswer(true);
    }
    setLoading(false);
  };
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <div>
      <div className="body container-fluid justify-content-center">
        <div className="outputArea">
          {loading ? (
            <div>
              <Svg />
            </div>
          ) : gotAnswer ? (
            <div className="text-area-background">
              <p className="text-area">{answer}</p>
            </div>
          ) : (
            <div className="exampleQuestion">
              <div className="row">
                <h3 className="desc col-sm">
                  Ask AI your Question Related to the following Youtube Video
                </h3>
                <iframe
                  className="youtube-video col-sm"
                  height="200"
                  src="https://www.youtube.com/embed/oL1uem6-3m4?controls=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <h4>Examples</h4>
              <div className="r">
                <div>
                  <p className="question">What is Service Now ?</p>
                </div>
                <div>
                  <p className="question">What is Service Now ?</p>
                </div>
                <div>
                  <p className="question">When Was Service Now ?</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <input
          className="input-area"
          id="outlined-textarea"
          label="Ask Question"
          placeholder="Ask Question Here"
          multiline
          value={question}
          onChange={handleChange}
        />
        {loading ? (
          <button className="btn btn-secondary" disabled>
            Loading
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Get Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default Body;
