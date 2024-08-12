import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

export default function ViewTestCasesBody() {
  const [allTestCases, setAllTestCases] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const getAllTestCases = () => {
    axios
      .get("http://localhost:8091/testcases/getAllTestCases")
      .then((response) => {
        if (response.data) {
          setAllTestCases(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getTestCaseById = (id) => {
    axios
      .get(`http://localhost:8091/testcases/getTestCaseById/${id}`)
      .then((response) => {
        if (response.data) {
          setInput(response.data.inputData);
          setOutput(response.data.expectedOutput);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateTestCase = (id, questionId) => {
    axios
      .put(`http://localhost:8091/testcases/updateTestCase`, {
        testCaseId: id,
        questions: {
          questionId,
        },
        inputData: input,
        expectedOutput: output,
      })
      .then((response) => {
        if (response.data) {
          getAllTestCases();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteTestCase = (id) => {
    axios
      .delete(`http://localhost:8091/testcases/deleteTestCase/${id}`)
      .then((response) => {
        if (response.data) {
          getAllTestCases();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(getAllTestCases, []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="text-light">All Test Cases...</h2>
        <button className="btn btn-primary" onClick={() => getAllTestCases()}>
          Refresh
          <MdOutlineRefresh />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-success table-striped-columns table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Contest</th>
              <th>Input</th>
              <th>Output</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allTestCases &&
              allTestCases.map((testCase, index) => (
                <tr key={index}>
                  <th scope="row">{testCase.testCaseId}</th>
                  <td>
                    {testCase.questions.questionId
                      ? testCase.questions.questionId
                      : "hello"}
                  </td>
                  <td>{testCase.questions.contests.contestId}</td>
                  <td>
                    <pre>{testCase.inputData}</pre>
                  </td>
                  <td>
                    <pre>{testCase.expectedOutput}</pre>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${testCase.testCaseId}01`}
                      onClick={() => getTestCaseById(testCase.testCaseId)}
                    >
                      Edit
                    </button>
                    <div
                      className="modal fade modal-md"
                      id={`exampleModal${testCase.testCaseId}01`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Edit Test Case with ID - {testCase.testCaseId}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          {input && (
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md">
                                  <div className="form-floating mb-3">
                                    <textarea
                                      className="form-control"
                                      placeholder="Enter Input Data"
                                      id="floatingTextarea5"
                                      onChange={(e) => setInput(e.target.value)}
                                      value={input}
                                      style={{ height: "150px" }}
                                    ></textarea>
                                    <label htmlFor="floatingTextarea5">
                                      Input Data
                                    </label>
                                  </div>
                                  <div className="form-floating mb-3">
                                    <textarea
                                      className="form-control"
                                      placeholder="Enter Input Data"
                                      id="floatingTextarea6"
                                      onChange={(e) =>
                                        setOutput(e.target.value)
                                      }
                                      value={output}
                                      style={{ height: "150px" }}
                                    ></textarea>
                                    <label htmlFor="floatingTextarea5">
                                      Expected Output Data
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleUpdateTestCase(
                                  testCase.testCaseId,
                                  testCase.questions.questionId
                                );
                              }}
                            >
                              Update Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${testCase.testCaseId}013`}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade modal-md"
                      id={`exampleModal${testCase.testCaseId}013`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Delete Test Case
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Do you want to delete this test case with ID -{" "}
                            {testCase.testCaseId}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                deleteTestCase(testCase.testCaseId);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
