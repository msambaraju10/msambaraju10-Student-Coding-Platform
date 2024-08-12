import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpBody() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const addContest = () => {
    axios
      .post("http://localhost:8091/contests/addContests", {
        contestId: 0,
        title,
        description,
        feeAmount: fee,
        startDate,
        endDate,
        createdAt: getCurrentTime(),
      })
      .then((response) => {
        if (response.data) {
          setTitle("");
          setDescription("");
          setFee(0);
          setStartDate("");
          setEndDate("");
          alert("Contest Added Successfully...");
        } else {
          alert("Something went wrong!!!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddContest = () => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    if (!(!isNaN(parseInt(fee, 10)) && isFinite(fee))) {
      alert("Please enter a valid number for the fee.");
    } else if (fee < 0) {
      alert("Fee cannot be less than zero");
    } else if (title.length < 1) {
      alert("Title cannot be less than 1 character");
    } else if (description.length < 6) {
      alert("Description must contain more than 5 characters");
    } else if (startDate === "" || endDate === "") {
      alert("Invalid Date.");
    } else if (date1 > date2) {
      alert("Invalid Dates");
    } else if (startDate === endDate) {
      alert("Date and Time cannot be same");
    } else {
      addContest();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">Add Contest</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGrid1"
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <label htmlFor="floatingInputGrid1">Title</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputGrid2"
                  placeholder="Enter Description"
                  onChange={(e) => setFee(e.target.value)}
                  value={fee}
                />
                <label htmlFor="floatingInputGrid2">Fee</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="floatingInputGrid3"
                  placeholder="Enter Start Date"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  min={getCurrentTime()}
                />
                <label htmlFor="floatingInputGrid3">Start Date</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="floatingInputGrid4"
                  placeholder="Enter End Date"
                  onChange={(e) => setEndDate(e.target.value)}
                  min={getCurrentTime()}
                  value={endDate}
                />
                <label htmlFor="floatingInputGrid4">End Date</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Description"
                  id="floatingTextarea5"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  style={{ height: "100px" }}
                ></textarea>
                <label htmlFor="floatingTextarea5">Description</label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddContest}
          >
            Add Contest
          </button>
        </div>
      </div>
    </div>
  );
}
