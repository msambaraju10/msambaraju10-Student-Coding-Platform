import React from "react";
import CustomerNavbar from "../UtilityComponents/CustomerNavbar";
import MyContestsBody from "./components/MyContestsBody";

export default function MyContests() {
  return (
    <>
      <CustomerNavbar page="myContests" />
      <MyContestsBody />
    </>
  );
}
