import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "../../redux/store.js";

export default function CustomerNavbar({ page }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/customerHome">
          Hackathon
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
                to="/customerHome"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "myContests" && "active"}`}
                to="/myContests"
              >
                MyContests
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "leaderBoard" && "active"}`}
                to="/leaderBoard"
              >
                LeaderBoard
              </Link>
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
                        navigate("/customerLogin");
                        dispatch(setUserLoginStatus(false));
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
