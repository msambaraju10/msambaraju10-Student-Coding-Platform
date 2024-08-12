import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function LeaderBoardBody() {
  const [allLeaderBoardEntries, setAllLeaderBoardEntries] = useState(null);

  const getAllLeaderBoardEntries = () => {
    axios
      .get("http://localhost:8091/leaderboards/getAllLeaderboardEntries")
      .then((response) => {
        if (response.data) {
          setAllLeaderBoardEntries(response.data.reverse());
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getLocalTime = (time) =>
    new Date(time).toISOString().slice(0, 16).replace("T", ", ");

  useEffect(() => getAllLeaderBoardEntries(), []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">LeaderBoard Results</h2>
        <button
          className="btn btn-primary"
          onClick={() => getAllLeaderBoardEntries()}
        >
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question ID</th>
              <th>Contest Title</th>
              <th>Name</th>
              <th>Score</th>
              <th>Total Marks</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {allLeaderBoardEntries &&
              allLeaderBoardEntries.map(
                (record, index) =>
                  record.score && (
                    <tr key={index}>
                      <th scope="row">{record.leaderboardId}</th>
                      <td>{record.questions.questionId}</td>
                      <td>{record.contests.title}</td>
                      <td>{`${record.users.firstName} ${record.users.lastName}`}</td>
                      <td>{record.score}</td>
                      <td>{record.questions.score}</td>
                      <td>{getLocalTime(record.submissionDate)}</td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
