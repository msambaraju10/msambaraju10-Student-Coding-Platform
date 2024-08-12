import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContestPaymentBody({
  registrationId,
  contestId,
  userId,
}) {
  // const [contestId, setContestId] = useState();
  const [fee, setFee] = useState();
  const [cardNumber, setCardNumber] = useState(0);
  const [expDate, setExpDate] = useState("");
  const [cvvNumber, setCvvNumber] = useState(0);

  const navigate = useNavigate();

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const handlePayment = () => {
    axios
      .post(
        "http://localhost:8091/payments/makePayment",
        {
          registrationId,
          contests: {
            contestId,
          },
          users: {
            userId,
          },
          paymentStatus: "done",
          registrationDate: getCurrentTime(),
        },
        {
          params: {
            cardNumber,
            cvvNumber,
            expiryDate: expDate,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          alert("Payment Success...");
          navigate("/myContests");
        } else {
          alert("Invalid credentials...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5 mb-5 text-light">
      <div className="container mt-5 mb-5">
        <div className="card">
          <h5 className="card-header">Contest Payment</h5>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingModel"
                    placeholder="Card Number"
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingModel">Card Number</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingModelYear"
                    placeholder="Expiry Date"
                    onChange={(e) => {
                      setExpDate(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingModel">Expiry Date</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingCost"
                    placeholder="CVV Number"
                    onChange={(e) => {
                      setCvvNumber(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingCost">CVV Number</label>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary mt-2 mb-1"
              onClick={handlePayment}
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
