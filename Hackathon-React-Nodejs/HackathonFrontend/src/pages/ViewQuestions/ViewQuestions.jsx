import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import ViewQuestionsBody from "./components/ViewQuestionsBody";

export default function ViewQuestions() {
  return (
    <>
      <AdminNavbar page="viewQuestions" />
      <ViewQuestionsBody />
    </>
  );
}
