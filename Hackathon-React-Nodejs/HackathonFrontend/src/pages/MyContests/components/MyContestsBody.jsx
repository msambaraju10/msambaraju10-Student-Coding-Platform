import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyContestsBody() {
  const [allContestRegistrations, setAllContestRegistrations] = useState();
  const [myContests, setMyContests] = useState();
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();

  const getAllContestRegistrations = () => {
    axios
      .get(
        "http://localhost:8091/contestRegistrations/getAllContestRegistrations"
      )
      .then((response) => {
        if (response.data) {
          setAllContestRegistrations(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const isExpired = (time) =>
    time > new Date().toISOString().split(".")[0] + ".000+00:00";

  const getIndianTime = (time) =>
    new Date(time).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  useEffect(getAllContestRegistrations, []);

  useEffect(() => {
    const temp =
      allContestRegistrations &&
      allContestRegistrations.filter(
        (registration) => registration.users.userId === userId
      );
    setMyContests(temp);
  }, [allContestRegistrations]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {myContests &&
          myContests.map((contest, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{contest.contests.title}</h3>
                  <p className="card-text">{contest.contests.description}</p>
                  <h6>
                    Payment Status:{" "}
                    {contest.paymentStatus === "done" ? (
                      <span className="text-success">Done</span>
                    ) : (
                      <span className="text-danger">Pending</span>
                    )}
                  </h6>
                  <p className="card-text">
                    {isExpired(contest.contests.endDate) ? (
                      <small className="text-body-secondary">
                        <span className="text-success">{`Last date: ${getIndianTime(
                          contest.contests.endDate
                        )}`}</span>
                      </small>
                    ) : (
                      <small className="text-body-secondary">
                        <span className="text-danger">{`Last date: ${getIndianTime(
                          contest.contests.endDate
                        )}`}</span>
                      </small>
                    )}
                  </p>
                  {contest.paymentStatus === "done" ? (
                    <button
                      className="btn btn-primary"
                      disabled={!isExpired(contest.contests.endDate)}
                      onClick={() =>
                        navigate(
                          `/examContestQuestions/${contest.contests.contestId}`
                        )
                      }
                    >
                      {isExpired(contest.contests.endDate)
                        ? "Take Test"
                        : "Expired"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        disabled={!isExpired(contest.contests.endDate)}
                        onClick={() =>
                          navigate(
                            `/contestPayment/${contest.registrationId}/${contest.contests.contestId}/${contest.users.userId}`
                          )
                        }
                      >
                        {isExpired(contest.contests.endDate)
                          ? "Make Payment"
                          : "Expired"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
