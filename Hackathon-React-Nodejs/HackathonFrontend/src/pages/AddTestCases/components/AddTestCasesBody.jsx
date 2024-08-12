import React, { useState } from "react";
import axios from "axios";

export default function AddTestCasesBody({ questionId }) {
  const [inputData, setInputData] = useState("");
  const [expectedOutputData, setExpectedOutputData] = useState("");

  const addTestCase = () => {
    axios
      .post("http://localhost:8091/testcases/addTestCase", {
        testCaseId: 0,
        questions: {
          questionId,
        },
        inputData,
        expectedOutput: expectedOutputData,
      })
      .then((response) => {
        if (response.data) {
          setExpectedOutputData("");
          setInputData("");
          alert("Test Case added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleTestCase = () => {
    if (!questionId || questionId === "") {
      alert("Invalid Question ID...");
    } else {
      addTestCase();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">
          Add Test Case for Question - {questionId}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md">
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Input Data"
                  id="floatingTextarea5"
                  onChange={(e) => setInputData(e.target.value)}
                  value={inputData}
                  style={{ height: "150px" }}
                ></textarea>
                <label htmlFor="floatingTextarea5">Input Data</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Input Data"
                  id="floatingTextarea6"
                  onChange={(e) => setExpectedOutputData(e.target.value)}
                  value={expectedOutputData}
                  style={{ height: "150px" }}
                ></textarea>
                <label htmlFor="floatingTextarea5">Expected Output Data</label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleTestCase}
          >
            Add Test Case
          </button>
        </div>
      </div>
    </div>
  );
}
