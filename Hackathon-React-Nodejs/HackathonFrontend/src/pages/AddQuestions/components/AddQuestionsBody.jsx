import React, { useState } from "react";
import axios from "axios";

export default function AddQuestionsBody({ contestId }) {
  const [score, setScore] = useState(10);
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("python");
  const [time, setTime] = useState(10);

  const addQuestion = () => {
    axios
      .post("http://localhost:8091/questions/addQuestion", {
        questionId: 0,
        contests: {
          contestId,
          contestName: "",
        },
        languageName: language,
        questionText: question,
        score,
        minutes: time,
      })
      .then((response) => {
        if (response.data) {
          setScore(0);
          setQuestion("");
          setLanguage("python");
          alert("Question Added successfully...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddQuestion = () => {
    if (!contestId) {
      alert("Invalid Contest ID...");
    } else if (score < 0) {
      alert("Score must be greater than zero");
    } else if (question.length < 5) {
      alert("Invalid Question...");
    } else {
      addQuestion();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">
          Add question for contest - {contestId}{" "}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputGrid2"
                  placeholder="Enter Score"
                  onChange={(e) => setScore(e.target.value)}
                  value={score}
                />
                <label htmlFor="floatingInputGrid2">Score</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <label htmlFor="floatingSelectGrid">Select Language</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputGrid2"
                  placeholder="Enter Time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
                <label htmlFor="floatingInputGrid2">Time</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Question"
                  id="floatingTextarea5"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  style={{ height: "300px" }}
                ></textarea>
                <label htmlFor="floatingTextarea5">Question</label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
