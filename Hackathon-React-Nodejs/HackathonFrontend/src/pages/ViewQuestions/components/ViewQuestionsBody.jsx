import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ViewQuestionsBody() {
  const [allQuestions, setAllQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState(0);
  const [contestId, setContestId] = useState(0);

  const navigate = useNavigate();

  const getAllQuestions = () => {
    axios
      .get("http://localhost:8091/questions/getAllQuestions")
      .then((response) => {
        if (response.data) {
          setAllQuestions(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getQuestionById = (id) => {
    axios
      .get(`http://localhost:8091/questions/getQuestionById/${id}`)
      .then((response) => {
        if (response.data) {
          setLanguage(response.data.languageName);
          setTime(response.data.minutes);
          setScore(response.data.score);
          setQuestionText(response.data.questionText);
          setContestId(response.data.contests.contestId);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const updateQuestion = (id) => {
    axios
      .put(`http://localhost:8091/questions/updateQuestion`, {
        questionId: id,
        contests: {
          contestId,
        },
        languageName: language,
        questionText,
        score,
        minutes: time,
      })
      .then((response) => {
        if (response.data) {
          getAllQuestions();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteQuestion = (id) => {
    axios
      .delete(`http://localhost:8091/questions/deleteQuestion/${id}`)
      .then((response) => {
        if (response.data) {
          getAllQuestions();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEditQuestion = (id) => {
    if (score < 0) {
      alert("Invalid score...");
    } else if (score < 0) {
      alert("Invalid marks...");
    } else {
      updateQuestion(id);
    }
  };

  useEffect(getAllQuestions, []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">All Questions...</h2>
        <button className="btn btn-primary" onClick={() => getAllQuestions()}>
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contest</th>
              <th>Language</th>
              <th>Duration</th>
              <th>Marks</th>
              <th>Question</th>
              <th>Title</th>
              <th>TestCase</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions &&
              allQuestions.map((question, index) => (
                <tr key={index}>
                  <th scope="row">{question.questionId}</th>
                  <th>{question.contests.contestId}</th>
                  <td>{question.languageName}</td>
                  <td>{question.minutes}</td>
                  <td>{question.score}</td>
                  <td>
                    <pre>{question.questionText}</pre>
                  </td>
                  <td>{question.contests.title}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        navigate(`/addTestCases/${question.questionId}`)
                      }
                    >
                      Add TestCase
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${question.questionId}0`}
                      onClick={() => getQuestionById(question.questionId)}
                    >
                      Edit
                    </button>
                    <div
                      className="modal fade modal-lg"
                      id={`exampleModal${question.questionId}0`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Edit Question with ID - {question.questionId}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          {questionText && (
                            <div className="modal-body">
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
                                    <label htmlFor="floatingInputGrid2">
                                      Score
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md">
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      id="floatingSelectGrid"
                                      onChange={(e) =>
                                        setLanguage(e.target.value)
                                      }
                                      value={language}
                                    >
                                      <option value="python">Python</option>
                                      <option value="java">Java</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      Select Language
                                    </label>
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
                                    <label htmlFor="floatingInputGrid2">
                                      Time
                                    </label>
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
                                      onChange={(e) =>
                                        setQuestionText(e.target.value)
                                      }
                                      value={questionText}
                                      style={{ height: "400px" }}
                                    ></textarea>
                                    <label htmlFor="floatingTextarea5">
                                      Question
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleEditQuestion(question.questionId);
                              }}
                            >
                              Update Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${question.questionId}10`}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${question.questionId}10`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Delete Question
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-danger">
                            Do you want to delete the question -
                            {question.questionId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() =>
                                deleteQuestion(question.questionId)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
