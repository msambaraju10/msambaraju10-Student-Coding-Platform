import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ page }) {
  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "home" && "active"}`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "about" && "active"}`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "contactUs" && "active"}`}
                aria-current="page"
                to="/contactUs"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/adminLogin">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customerLogin">
                    User Login
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page === "signUp" && "active"}`}
                aria-current="page"
                to="/signUp"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
