import React from "react";
import Navbar from "../UtilityComponents/Navbar";
import AboutBody from "./components/AboutBody";

export default function About() {
  return (
    <>
      <Navbar page="about" />
      <AboutBody />
    </>
  );
}
