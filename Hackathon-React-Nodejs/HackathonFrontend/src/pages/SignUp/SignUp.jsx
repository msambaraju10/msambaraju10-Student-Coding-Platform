import React from "react";
import Navbar from "../UtilityComponents/Navbar";
import SignUpBody from "./components/SignUpBody";

export default function SignUp() {
  return (
    <>
      <Navbar page="signUp" />
      <SignUpBody />
    </>
  );
}
