import React from "react";
import CustomerNavbar from "../UtilityComponents/CustomerNavbar";
import ContestPaymentBody from "./components/ContestPaymentBody";
import { useParams } from "react-router-dom";

export default function ContestPayment() {
  const { registrationId, contestId, userId } = useParams();
  return (
    <>
      <CustomerNavbar />
      <ContestPaymentBody
        registrationId={registrationId}
        contestId={contestId}
        userId={userId}
      />
    </>
  );
}
