import React from "react";
import CustomerNavbar from "../UtilityComponents/CustomerNavbar";
import LeaderBoardBody from "./components/LeaderBoardBody";

export default function LeaderBoard() {
  return (
    <>
      <CustomerNavbar page="leaderBoard" />
      <LeaderBoardBody />
    </>
  );
}
