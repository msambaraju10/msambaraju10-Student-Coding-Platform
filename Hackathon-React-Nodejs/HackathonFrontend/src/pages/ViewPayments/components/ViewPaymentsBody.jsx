import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineRefresh } from "react-icons/md";

export default function ViewPaymentsBody() {
  const [allPayments, setAllPayments] = useState(null);

  const getAllPayments = () => {
    axios
      .get("http://localhost:8091/payments/getAllPayments")
      .then((response) => {
        if (response.data) {
          setAllPayments(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeletePayment = (id) => {
    axios
      .delete(`http://localhost:8091/payments/deletePayment/${id}`)
      .then((response) => {
        if (response.data) {
          getAllPayments();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLocalTime = (time) =>
    new Date(time).toISOString().slice(0, 16).replace("T", ", ");

  useEffect(getAllPayments, []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">All Payments...</h2>
        <button className="btn btn-primary" onClick={() => getAllPayments()}>
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered border-secondary mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration ID</th>
              <th>Contest ID</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Mobile</th>
              <th>Title</th>
              <th>Payment Date</th>
              <th>Registration Date</th>
              <th>Fee Amount</th>
              <th>Payment Method </th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allPayments &&
              allPayments.map((payment, index) => (
                <tr key={index}>
                  <th scope="row">{payment.paymentId}</th>
                  <th scope="row">
                    {payment.contestRegistrations.registrationId}
                  </th>
                  <td>{payment.contestRegistrations.contests.contestId}</td>
                  <td>{`${payment.contestRegistrations.users.firstName} ${payment.contestRegistrations.users.lastName}`}</td>
                  <td>{payment.contestRegistrations.users.email}</td>
                  <td>{payment.contestRegistrations.users.mobile}</td>
                  <td>{payment.contestRegistrations.contests.title}</td>
                  <td>{getLocalTime(payment.paymentDate)}</td>
                  <td>
                    {getLocalTime(
                      payment.contestRegistrations.registrationDate
                    )}
                  </td>
                  <td>{payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${payment.paymentId}`}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${payment.paymentId}`}
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
                              Payment Delete Alert
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-start text-danger">
                            Do you want to delete the payment with ID -{" "}
                            {payment.paymentId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleDeletePayment(payment.paymentId);
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
