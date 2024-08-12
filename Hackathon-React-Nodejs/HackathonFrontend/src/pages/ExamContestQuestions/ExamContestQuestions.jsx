import React from "react";
import CustomerNavbar from "../UtilityComponents/CustomerNavbar";
import ExamContestQuestionsBody from "./components/ExamContestQuestionsBody";
import { useParams } from "react-router-dom";

export default function ExamContestQuestions() {
  const { id } = useParams();
  return (
    <>
      <CustomerNavbar />
      <ExamContestQuestionsBody id={id} />
    </>
  );
}
