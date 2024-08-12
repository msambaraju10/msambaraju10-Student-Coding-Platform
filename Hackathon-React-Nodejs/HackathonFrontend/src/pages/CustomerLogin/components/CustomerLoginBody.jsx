import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "../../../redux/store.js";
import { setUserId } from "../../../redux/store.js";

export default function CustomerLoginBody() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLoginStatus(false));
  }, []);

  const login = async () => {
    axios
      .post("http://localhost:8091/users/getUserByEmailAndPass", {
        userId: 0,
        firstName: "",
        lastName: "",
        gender: "",
        mobile: "",
        password,
        email: emailId,
        qualifications: "",
        registrationDate: "",
      })
      .then((response) => {
        if (response.data) {
          dispatch(setUserLoginStatus(true));
          dispatch(setUserId(response.data.userId));
          navigate("/customerHome");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => {
        alert("Something went wrong. Please try again...");
        console.error(error);
      });
  };

  const handleLogin = () => {
    emailId.length < 3
      ? alert("Invalid Username...")
      : password.length < 3
      ? alert("Invalid Password...")
      : login();
  };

  return (
    <div className="container mt-5 mb-5 mx-auto">
      <div className="container d-flex align-items-center">
        <img
          className="mx-auto"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          alt="Network Error..."
          style={{ width: "12rem" }}
        />
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
          placeholder="Username"
        />
        <label htmlFor="floatingInput">Email Address</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          id="floatingPassword"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="mt-3 mb-3">
        <Link
          className="link-offset-2 link-underline link-underline-opacity-0"
          to="/signUp"
        >
          Don't have Account? Create one
        </Link>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
