import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import ViewTestCasesBody from "./components/ViewTestCasesBody";

export default function ViewTestCases() {
  return (
    <>
      <AdminNavbar page="viewTestCases" />
      <ViewTestCasesBody />
    </>
  );
}
