import React from "react";
import CustomerNavbar from "../UtilityComponents/CustomerNavbar";
import CustomerHomeBody from "./components/CustomerHomeBody";

export default function CustomerHome() {
  return (
    <>
      <CustomerNavbar page="home" />
      <CustomerHomeBody />
    </>
  );
}
