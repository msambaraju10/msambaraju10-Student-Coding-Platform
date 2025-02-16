import React from "react";

export default function ContactUsBody() {
  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <h5 className="card-header">Contact Us</h5>
        <div className="card-body">
          <h5 className="card-title">Fill the below form</h5>
          <div className="form-floating mb-3 mt-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              placeholder="Enter your Name"
            />
            <label htmlFor="floatingInput1">Name</label>
          </div>

          <div className="form-floating mb-3 mt-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput2"
              placeholder="name@gmail.com"
            />
            <label htmlFor="floatingInput2">Email address</label>
          </div>

          <div className="form-floating mb-4 mt-4">
            <textarea
              className="form-control"
              placeholder="Leave a message here"
              id="floatingTextarea2"
              style={{ height: "150px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Message</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
