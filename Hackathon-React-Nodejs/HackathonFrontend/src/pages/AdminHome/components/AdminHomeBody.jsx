import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";

export default function AdminHomeBody() {
  const [users, setUsers] = useState(null);

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8091/users/deleteUser/${id}`)
      .then((response) =>
        response.data ? getAllUsers() : alert("Something went wrong!!!")
      )
      .catch((error) => console.error(error));
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:8091/users/getAllUsers")
      .then((response) => {
        response.data
          ? setUsers(response.data)
          : alert("Something went wrong!!!");
      })
      .catch((error) => console.error(error));
  };

  const getLocalTime = (time) =>
    new Date(time).toISOString().slice(0, 16).replace("T", ", ");

  useEffect(() => {
    getAllUsers();
  }, []);

  return users ? (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">All Customers...</h2>
        <button className="btn btn-primary" onClick={() => getAllUsers()}>
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered  mt-4">
          <caption className="text-light">List of users</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Qualification</th>
              <th>Password</th>
              <th>Registration Date</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.userId}</th>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>{user.qualifications}</td>
                  <td>{user.password}</td>
                  <td>{getLocalTime(user.registrationDate)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${user.userId}`}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${user.userId}`}
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
                              User Details
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-start text-danger">
                            Do you want to delete the user with ID -{" "}
                            {user.userId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleDeleteUser(user.userId);
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
  ) : (
    <h2>Loading</h2>
  );
}
