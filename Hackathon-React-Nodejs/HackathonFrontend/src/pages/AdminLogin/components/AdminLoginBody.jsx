import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminLoginStatus } from "../../../redux/store.js";

export default function AdminLoginBody() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminLoginStatus(false));
  }, []);

  const login = () => {
    axios
      .post("http://localhost:8091/adminLogin", {
        userName: username,
        password,
      })
      .then((response) => {
        if (response.data) {
          dispatch(setAdminLoginStatus(true));
          navigate("/adminHome");
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
    username.length < 3
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <label htmlFor="floatingInput">Username</label>
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
      <button type="button" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
