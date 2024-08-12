import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import AdminHomeBody from "./components/AdminHomeBody";

export default function AdminHome() {
  return (
    <>
      <AdminNavbar page="home" />
      <AdminHomeBody />
    </>
  );
}
