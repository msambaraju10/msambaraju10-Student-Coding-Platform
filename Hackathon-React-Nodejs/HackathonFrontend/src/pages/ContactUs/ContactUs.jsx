import React from "react";
import Navbar from "../UtilityComponents/Navbar";
import ContactUsBody from "./components/ContactUsBody";

export default function ContactUs() {
  return (
    <>
      <Navbar page="contactUs" />
      <ContactUsBody />
    </>
  );
}
