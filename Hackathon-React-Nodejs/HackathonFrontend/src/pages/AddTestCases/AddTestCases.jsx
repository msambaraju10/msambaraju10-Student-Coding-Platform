import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import AddTestCasesBody from "./components/AddTestCasesBody";
import { useParams } from "react-router-dom";

export default function AddTestCases() {
  const { id } = useParams();

  return (
    <>
      <AdminNavbar />
      <AddTestCasesBody questionId={id} />
    </>
  );
}
