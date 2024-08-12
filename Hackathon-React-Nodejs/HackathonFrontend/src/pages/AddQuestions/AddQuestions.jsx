import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import AddQuestionsBody from "./components/AddQuestionsBody";
import { useParams } from "react-router-dom";

export default function AddQuestions() {
  const { id } = useParams();

  return (
    <>
      <AdminNavbar />
      <AddQuestionsBody contestId={id} />
    </>
  );
}
