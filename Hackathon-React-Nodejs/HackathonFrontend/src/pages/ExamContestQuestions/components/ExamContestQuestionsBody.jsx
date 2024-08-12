import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ExamContestQuestionsBody({ id }) {
  const [attemptedQuestions, setAttemptedQuestions] = useState(null);
  const [unAttemptedQuestions, setUnAttemptedQuestions] = useState(null);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  const filterQuestions = async (data1, data2, id = userId) => {
    const unAttemptedQuestions = data1.filter(
      (question) =>
        !data2.some(
          (record) =>
            record.questions.questionId === question.questionId &&
            record.users.userId === id
        )
    );

    const attemptedQuestions = data1.filter((question) =>
      data2.some(
        (record) =>
          record.questions.questionId === question.questionId &&
          record.users.userId === id
      )
    );
    setUnAttemptedQuestions(unAttemptedQuestions);
    setAttemptedQuestions(attemptedQuestions);
  };

  const getUserDataFromLeaderBoard = (data) => {
    axios
      .get(
        `http://localhost:8091/leaderboards/getLeaderboardByUserId/user/${userId}`
      )
      .then((response) => {
        if (response.data) {
          filterQuestions(data, response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getContestQuestions = () => {
    axios
      .get(`http://localhost:8091/questions/getQuestionsByContestId/${id}`)
      .then((response) => {
        if (response.data) {
          getUserDataFromLeaderBoard(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(getContestQuestions, []);

  return (
    <div className="container mt-5 mb-5">
      {unAttemptedQuestions &&
        unAttemptedQuestions.map((question, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body d-inline-flex justify-content-between align-content-center ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <h5>Question - {index + 1}</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/takeExam/${question.questionId}/${id}/${userId}`)
                  }
                >
                  Solve
                </button>
              </div>
            </div>
          </div>
        ))}
      {attemptedQuestions &&
        attemptedQuestions.map((question, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body d-inline-flex justify-content-between align-content-center ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <h5>Question - {unAttemptedQuestions.length + index + 1}</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <button className="btn btn-primary" disabled={true}>
                  Solved
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
