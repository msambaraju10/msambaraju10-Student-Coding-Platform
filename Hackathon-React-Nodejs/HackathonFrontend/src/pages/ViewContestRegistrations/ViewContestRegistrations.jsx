import React from "react";
import AdminNavbar from "../UtilityComponents/AdminNavbar";
import ViewContestRegistrationsBody from "./components/ViewContestRegistrationsBody";

export default function ViewContestRegistrations() {
  return (
    <div>
      <AdminNavbar page="viewContestRegistrations" />
      <ViewContestRegistrationsBody />
    </div>
  );
}
