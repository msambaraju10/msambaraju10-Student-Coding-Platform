import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";

export default function ViewContestsBody() {
  const [contests, setContests] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const getLocalTime = (time) =>
    new Date(time).toISOString().slice(0, 16).replace("T", ", ");

  const getContestById = (id) => {
    axios
      .get(`http://localhost:8091/contests/getContestById/${id}`)
      .then((response) => {
        if (response.data) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setFee(response.data.feeAmount);
          setStartDate(response.data.startDate.slice(0, 16));
          setEndDate(response.data.endDate.slice(0, 16));
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllContests = () => {
    axios
      .get("http://localhost:8091/contests/getAllContests")
      .then((response) => setContests(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllContests(), []);

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const editContest = (id) => {
    axios
      .put(`http://localhost:8091/contests/updateContests/${id}`, {
        title,
        description,
        feeAmount: fee,
        startDate,
        endDate,
        createdAt: getCurrentTime(),
      })
      .then((response) => {
        if (response.data) {
          getAllContests();
        } else {
          alert("Something went wrong!!!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteContestById = (id) => {
    axios
      .delete(`http://localhost:8091/contests/deleteContests/${id}`)
      .then((response) => {
        if (response.data) {
          getAllContests();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteContest = (id) => {
    deleteContestById(id);
  };

  const handleEditContest = (id) => {
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
      editContest(id);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">All Contests...</h2>
        <button className="btn btn-primary" onClick={() => getAllContests()}>
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Fee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Created At</th>
              <th className="text-center">Add Question</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {contests &&
              contests.map((contest, index) => (
                <tr key={index}>
                  <th scope="row">{contest.contestId}</th>
                  <td>{contest.title}</td>
                  <td>{contest.description}</td>
                  <td>{contest.feeAmount}</td>
                  <td>{getLocalTime(contest.startDate)}</td>
                  <td>{getLocalTime(contest.endDate)}</td>
                  <td>{getLocalTime(contest.createdAt)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        navigate(`/addQuestions/${contest.contestId}`)
                      }
                    >
                      Add question
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${contest.contestId}`}
                      onClick={() => getContestById(contest.contestId)}
                    >
                      Edit
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${contest.contestId}`}
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
                              Edit Contest ID - {contest.contestId}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          {title && (
                            <div className="modal-body">
                              <div className="container">
                                <div className="row">
                                  <div className="col-md">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInputGrid1"
                                        placeholder="Enter Title"
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                        value={title}
                                      />
                                      <label htmlFor="floatingInputGrid1">
                                        Title
                                      </label>
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
                                      <label htmlFor="floatingInputGrid2">
                                        Fee
                                      </label>
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
                                        min={getCurrentTime()}
                                        onChange={(e) => {
                                          setStartDate(e.target.value);
                                        }}
                                        value={startDate}
                                      />
                                      <label htmlFor="floatingInputGrid3">
                                        Start Date
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="floatingInputGrid4"
                                        min={getCurrentTime()}
                                        placeholder="Enter End Date"
                                        onChange={(e) =>
                                          setEndDate(e.target.value)
                                        }
                                        value={endDate}
                                      />
                                      <label htmlFor="floatingInputGrid4">
                                        End Date
                                      </label>
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
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                        value={description}
                                        style={{ height: "100px" }}
                                      ></textarea>
                                      <label htmlFor="floatingTextarea5">
                                        Description
                                      </label>
                                    </div>
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
                                handleEditContest(contest.contestId);
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
                      data-bs-target={`#exampleModal${contest.contestId}1`}
                      onClick={() => getContestById(contest.contestId)}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${contest.contestId}1`}
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
                              Delete Contest
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-danger">
                            Do you want to delete the contest with ID -{" "}
                            {contest.contestId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleDeleteContest(contest.contestId);
                              }}
                            >
                              Save
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
