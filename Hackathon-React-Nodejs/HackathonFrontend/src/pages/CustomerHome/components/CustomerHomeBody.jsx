import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CustomerHomeBody() {
  const [allContests, setAllContests] = useState(null);
  const [contests, setContests] = useState(null);
  const [filter, setFilter] = useState("1");

  const userId = useSelector((state) => state.userId);

  const isExpired = (time) =>
    time > new Date().toISOString().split(".")[0] + ".000+00:00";

  const getFilteredContests = (data) => {
    if (filter == "1") {
      setContests(data);
    } else if (filter == "2") {
      const filteredData = data.filter((contest) => isExpired(contest.endDate));
      setContests(filteredData);
    } else {
      const filteredData = data.filter(
        (contest) => !isExpired(contest.endDate)
      );
      setContests(filteredData);
    }
  };

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const getIndianTime = (time) =>
    new Date(time).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const getAllContests = () => {
    axios
      .get("http://localhost:8091/contests/getAllContests")
      .then((response) => {
        setAllContests(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleRegistration = (id) => {
    axios
      .post(
        "http://localhost:8091/contestRegistrations/addContestRegistration",
        {
          registrationId: 0,
          users: {
            userId,
          },
          contests: {
            contestId: id,
          },
          registrationDate: getCurrentTime(),
          paymentStatus: "pending",
        }
      )
      .then((response) => {
        if (response.data) {
          alert(
            "Registration Successful, Checkout MyContests for payment details"
          );
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllContests();
  }, []);

  const handleSearch = (search) => {
    const searchResults = allContests.filter(
      (contest) =>
        contest.title.toLowerCase().includes(search.toLowerCase()) ||
        contest.description.toLowerCase().includes(search.toLowerCase())
    );
    setContests(searchResults);
  };

  useEffect(() => {
    allContests && getFilteredContests(allContests);
  }, [allContests, filter]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="1">Display all contests</option>
              <option value="2">Display latest contests</option>
              <option value="3">Display expired contests</option>
            </select>
            <label htmlFor="floatingSelect">Filter</label>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Search for Contests..."
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Search</label>
          </div>
        </div>
        <div className="col-md-4 mb-3"></div>
      </div>

      <div className="row">
        {contests &&
          contests.map((contest, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{contest.title}</h4>
                  <h5>₹ {contest.feeAmount.toLocaleString("en-IN")}</h5>
                  <p className="card-text">{contest.description}</p>
                  <p className="card-text">
                    {isExpired(contest.endDate) ? (
                      <small className="text-body-secondary">
                        {`Last date: ${getIndianTime(contest.endDate)}`}
                      </small>
                    ) : (
                      <small className="text-body-secondary ">
                        <span className="text-danger">
                          Registration expired :(
                        </span>
                      </small>
                    )}
                  </p>
                  <button
                    className="btn btn-primary"
                    disabled={!isExpired(contest.endDate)}
                    onClick={() => handleRegistration(contest.contestId)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
