import axios from "axios";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { useNavigate } from "react-router-dom";
import "brace/mode/python";
import "brace/mode/java";
import "brace/theme/monokai";
import "brace/ext/language_tools";

export default function TakeExamBody({ id, contestId, userId }) {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");
  const [userCode, setUserCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [output, setOutput] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);

  const navigate = useNavigate();

  let count = 0;
  let responseOutput = "";
  let totalTestCases = testCases.length;
  let pass = 0;
  let marks = 0;

  const getCurrentTime = () =>
    new Date()
      .toLocaleString("sv", { timeZone: "Asia/Kolkata", timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16);

  const runTestCase = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/compile", {
        language,
        code: userCode,
        input: data.inputData,
      });

      if (response.data) {
        responseOutput += "\n" + response.data;
        return `${response.data}`.trim() == `${data.expectedOutput}`.trim();
      } else {
        alert("Something went wrong");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleRunTestCases = async () => {
    pass = 0;
    for (let i = 0; i < totalTestCases; i++) {
      const testCase = testCases[i];

      const testCaseResult = await runTestCase(testCase);

      if (testCaseResult) {
        pass += 1;
      } else {
        responseOutput += `Test case - ${i + 1} --- FAILED\n`;
      }
      count += 1;
    }

    if (pass === totalTestCases) {
      responseOutput += "\n\n>>> TEST CASES PASSED <<<";
    } else {
      responseOutput += "\n\n>>> TEST CASES FAILED <<<";
    }
    setOutput(responseOutput);
    setLoading(false);
  };

  const addToLeaderBoard = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8091/leaderboards/saveLeaderboardEntry",
        {
          leaderboardId: 0,
          contests: {
            contestId: contestId,
          },
          users: {
            userId: userId,
          },
          score: marks,
          questions: {
            questionId: id,
          },
          submissionDate: getCurrentTime(),
        }
      );

      if (response.data) {
        setLoading(false);
        navigate("/myContests");
        alert("Your exam successfully submitted");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    pass = 0;
    for (let i = 0; i < totalTestCases; i++) {
      const testCase = testCases[i];
      const testCaseResult = await runTestCase(testCase);
      if (testCaseResult) {
        pass += 1;
      }
    }
    if (pass === totalTestCases) {
      marks = question.score;
    } else {
      marks = 0;
    }
    await addToLeaderBoard();
  };

  const getTestCases = () => {
    axios
      .get("http://localhost:8091/testcases/getAllTestCases")
      .then((response) => {
        if (response.data) {
          setTestCases(
            response.data.filter(
              (testCase) => testCase.questions.questionId == id
            )
          );
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getContestQuestion = () => {
    axios
      .get(`http://localhost:8091/questions/getQuestionById/${id}`)
      .then((response) => {
        if (response.data) {
          getTestCases();
          setQuestion(response.data);
          setLanguage(response.data.languageName);
          setUserCode(response.data.questionText);
          setRemainingTime(response.data.minutes * 60);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handlePopstate = () => {};

    // Attach the event listener
    window.addEventListener("popstate", handlePopstate);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleSubmit);
    window.addEventListener("unload", () => navigate("/myContests"));
    return () => {
      window.removeEventListener("beforeunload", handleSubmit);
      window.addEventListener("unload", () => navigate("/myContests"));
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleSubmit();
    }
  }, [remainingTime]);

  useEffect(() => {
    getContestQuestion();
  }, []);

  return (
    question && (
      <div className="container mb-5">
        <div
          className="mt-4 mb-4 text-light"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4>Complete the following code</h4>
          <div className="d-flex align-items-center">
            <span className="me-2">Time Remaining:</span>
            <strong>
              {Math.floor(remainingTime / 60) < 10
                ? `0${Math.floor(remainingTime / 60)}`
                : `${Math.floor(remainingTime / 60)}`}
              :
              {remainingTime % 60 < 10
                ? `0${remainingTime % 60}`
                : `${remainingTime % 60}`}
            </strong>
          </div>
        </div>
        <div className="editor">
          <AceEditor
            mode={language}
            width="100%"
            theme="monokai"
            name="editor"
            onChange={(code) => setUserCode(code)}
            fontSize={17}
            value={userCode}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
            }}
            onLoad={(editor) => {
              editor.getSession().setOption("useWorker", false);
              editor.getSession().setOption("extraKeys", {
                "Ctrl-Space": "autocomplete",
              });
            }}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div
          className="mb-3 mt-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            Instructions
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={() => {
              handleRunTestCases();
              setLoading(true);
              setOutput("Running Test Cases...");
            }}
          >
            Run Test Cases
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={() => {
              handleSubmit();
              setLoading(true);
              setOutput("Running Test Cases...");
            }}
          >
            Submit
          </button>
          <div
            class="modal fade text-light "
            id="exampleModal1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-theme="dark"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Instructions
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <ol>
                    <li>
                      You will be given certain time for the question then after
                      the completion of the time then the exam will be
                      automatically submitted.
                    </li>
                    <li>
                      While writing the exam you will need a good internet
                      connection.
                    </li>
                    <li>
                      Do not reload the site if you reload the site the your
                      exam will be submitted automatically.
                    </li>
                    <li>
                      You will be having only one chance to attempt each
                      question.
                    </li>
                  </ol>
                  <hr />
                  <h2 className="text-center text-success mt-3 mb-3">
                    All the best
                  </h2>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {output && (
            <div className="form-floating">
              <textarea
                className="form-control bg-dark text-light"
                value={output}
                style={{ height: "400px" }}
                readOnly
              ></textarea>
              <label htmlFor="floatingTextarea2" className="">
                Output
              </label>
            </div>
          )}
        </div>
      </div>
    )
  );
}
