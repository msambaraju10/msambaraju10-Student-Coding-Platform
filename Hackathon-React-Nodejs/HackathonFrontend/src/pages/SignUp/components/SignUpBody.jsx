import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpBody() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("male");
  const [qualification, setQualification] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const signUp = () => {
    axios
      .post("http://localhost:8091/users/addUser", {
        userId: 0,
        firstName,
        lastName,
        gender,
        mobile,
        password,
        email: emailId,
        qualifications: qualification,
        registrationDate: getCurrentTime(),
      })
      .then((response) =>
        response.data
          ? navigate("/customerLogin")
          : alert("Something went wrong...")
      )
      .catch((error) => console.error(error));
  };

  const handleSignUp = () => {
    if (firstName.length < 5) {
      alert("First Name should be at least 5 characters long.");
    } else if (lastName.length < 5) {
      alert("Last Name should be at least 5 characters long.");
    } else if (mobile.length !== 10) {
      alert("Mobile should be 10 characters long.");
    } else if (password.length < 5 || confirmPassword.length < 5) {
      alert("Password must be at least 5 characters long.");
    } else if (!(!isNaN(parseInt(mobile, 10)) && isFinite(mobile))) {
      alert("Mobile number should be numeric.");
    } else if (password !== confirmPassword) {
      alert("Both password does not match.");
    } else {
      signUp();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">Create your account</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput1"
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>
            </div>

            <div className="col-sm">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput2"
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="floatingSelectGrid"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="floatingSelectGrid">Select your gender</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput3"
              placeholder="Enter your Email Address"
              onChange={(e) => setEmailId(e.target.value)}
              value={emailId}
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput4"
              placeholder="Enter your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            <label htmlFor="floatingInput">Mobile Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput5"
              placeholder="Enter your Qualification"
              onChange={(e) => setQualification(e.target.value)}
              value={qualification}
            />
            <label htmlFor="floatingInput">Qualification</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput6"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput7"
              placeholder="Enter your confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <label htmlFor="floatingInput">Confirm Password</label>
          </div>

          <div className="mt-3 mb-3">
            <Link
              className="link-offset-2 link-underline link-underline-opacity-0"
              to="/customerLogin"
            >
              Have an account? Login
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignUp}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
