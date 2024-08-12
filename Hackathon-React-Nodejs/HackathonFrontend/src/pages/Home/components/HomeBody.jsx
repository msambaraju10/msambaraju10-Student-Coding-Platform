import React from "react";
import { Link } from "react-router-dom";

export default function HomeBody() {
  return (
    <div className="container mt-5 mb-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-3">
            <img
              src="https://wallpapercave.com/wp/wp7133269.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="p-3">
              <Link className="btn btn-primary" to="/customerLogin">
                Check out
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <img
              src="https://wallpapercave.com/wp/wp9922684.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="p-3">
              <Link className="btn btn-primary" to="/customerLogin">
                Check out
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <img
              src="https://wallpapercave.com/wp/wp12456138.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="p-3">
              <Link className="btn btn-primary" to="/customerLogin">
                Check out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
