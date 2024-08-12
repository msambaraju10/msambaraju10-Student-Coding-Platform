import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminLoginStatus } from "../../redux/store.js";

export default function AdminNavbar({ page }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav
      className="navbar navbar-expand-md bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/adminHome">
          Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ justifyContent: "space-between" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "home" && "active"}`}
                aria-current="page"
                to="/adminHome"
              >
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Contest
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/addContest">
                    Add Contest
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/viewContests">
                    View Contests
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${page === "viewQuestions" && "active"}`}
                aria-current="page"
                to="/viewQuestions"
              >
                ViewQuestions
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${page === "viewTestCases" && "active"}`}
                aria-current="page"
                to="/viewTestCases"
              >
                ViewTestCases
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Records
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/viewContestRegistrations"
                  >
                    ViewRegistrations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/viewPayments">
                    ViewPayments
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Logout
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-light"
                      id="exampleModalLabel"
                    >
                      Logout alert
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-light">
                    Are you sure you want to logout?
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
                      onClick={() => {
                        navigate("/adminLogin");
                        dispatch(setAdminLoginStatus(false));
                      }}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
