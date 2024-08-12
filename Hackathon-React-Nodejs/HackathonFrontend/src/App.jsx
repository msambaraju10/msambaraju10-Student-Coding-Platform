import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import SignUp from "./pages/SignUp/SignUp";
import AdminHome from "./pages/AdminHome/AdminHome";
import AddContest from "./pages/AddContest/AddContest";
import AddQuestions from "./pages/AddQuestions/AddQuestions";
import AddTestCases from "./pages/AddTestCases/AddTestCases";
import ViewTestCases from "./pages/ViewTestCases/ViewTestCases";
import ViewContests from "./pages/ViewContests/ViewContests";
import ViewQuestions from "./pages/ViewQuestions/ViewQuestions";
import ViewContestRegistrations from "./pages/ViewContestRegistrations/ViewContestRegistrations";
import ViewPayments from "./pages/ViewPayments/ViewPayments";
import CustomerHome from "./pages/CustomerHome/CustomerHome";
import ContestPayment from "./pages/ContestPayment/ContestPayment";
import MyContests from "./pages/MyContests/MyContests";
import ExamContestQuestions from "./pages/ExamContestQuestions/ExamContestQuestions";
import TakeExam from "./pages/TakeExam/TakeExam";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { useSelector } from "react-redux";

export default function App() {
  const userLoginStatus = useSelector((state) => state.userLoginStatus);
  const adminLoginStatus = useSelector((state) => state.adminLoginStatus);
  // const userLoginStatus = true;
  // const adminLoginStatus = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/signUp" element={<SignUp />} />
        {adminLoginStatus && (
          <>
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/addContest" element={<AddContest />} />
            <Route path="/viewContests" element={<ViewContests />} />
            <Route path="/viewPayments" element={<ViewPayments />} />
            <Route path="/addQuestions/:id" element={<AddQuestions />} />
            <Route path="/addTestCases/:id" element={<AddTestCases />} />
            <Route path="/viewQuestions" element={<ViewQuestions />} />
            <Route path="/viewTestCases" element={<ViewTestCases />} />
            <Route
              path="/viewContestRegistrations"
              element={<ViewContestRegistrations />}
            />
          </>
        )}
        {userLoginStatus && (
          <>
            <Route path="/customerHome" element={<CustomerHome />} />
            <Route path="/myContests" element={<MyContests />} />
            <Route path="/leaderBoard" element={<LeaderBoard />} />
            <Route
              path="/takeExam/:id/:contestId/:userId"
              element={<TakeExam />}
            />
            <Route
              path="/examContestQuestions/:id"
              element={<ExamContestQuestions />}
            />
            <Route
              path="/contestPayment/:registrationId/:contestId/:userId"
              element={<ContestPayment />}
            />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
