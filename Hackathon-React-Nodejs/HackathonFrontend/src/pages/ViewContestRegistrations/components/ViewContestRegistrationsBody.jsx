import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";

export default function ViewContestRegistrationsBody() {
  const [registrations, setRegistrations] = useState(null);
  const getLocalTime = (time) =>
    new Date(time).toISOString().slice(0, 16).replace("T", ", ");

  const getAllRegistrations = () => {
    axios
      .get(
        "http://localhost:8091/contestRegistrations/getAllContestRegistrations"
      )
      .then((response) => {
        if (response.data) setRegistrations(response.data);
        else alert("Something went wrong...");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteContestRegistration = (id) => {
    axios
      .delete(
        `http://localhost:8091/contestRegistrations/deleteContestRegistration/${id}`
      )
      .then((response) => {
        if (response.data) getAllRegistrations();
        else alert("Something went wrong...");
      });
  };

  useEffect(getAllRegistrations, []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">Registrations...</h2>
        <button
          className="btn btn-primary"
          onClick={() => getAllRegistrations()}
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
              <th>Contest ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Registration Date</th>
              <th>Fee</th>
              <th>Payment Status</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {registrations &&
              registrations.map((registration, index) => (
                <tr key={index}>
                  <th scope="row">{registration.registrationId}</th>
                  <td>{registration.contests.contestId}</td>
                  <td>{registration.users.userId}</td>
                  <td>{`${registration.users.firstName} ${registration.users.lastName}`}</td>
                  <td>{registration.users.email}</td>
                  <td>{registration.contests.title}</td>
                  <td>{getLocalTime(registration.contests.startDate)}</td>
                  <td>{getLocalTime(registration.contests.endDate)}</td>
                  <td>{getLocalTime(registration.registrationDate)}</td>
                  <td>{registration.contests.feeAmount}</td>
                  <td>{registration.paymentStatus}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${registration.registrationId}1`}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${registration.registrationId}1`}
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
                              Delete Contest Registration
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-danger">
                            Do you want to delete the contest Registration with
                            ID - {registration.registrationId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleDeleteContestRegistration(
                                  registration.registrationId
                                );
                              }}
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
