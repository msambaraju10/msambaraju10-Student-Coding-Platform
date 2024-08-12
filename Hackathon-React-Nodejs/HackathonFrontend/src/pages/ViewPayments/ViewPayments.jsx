import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import ViewPaymentsBody from "./components/ViewPaymentsBody";

export default function ViewPayments() {
  return (
    <>
      <AdminNavbar page="viewPayments" />
      <ViewPaymentsBody />
    </>
  );
}
