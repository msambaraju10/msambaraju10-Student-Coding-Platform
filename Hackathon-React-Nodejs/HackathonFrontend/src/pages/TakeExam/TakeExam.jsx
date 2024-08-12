import React from "react";
import { useParams } from "react-router-dom";
import TakeExamBody from "./components/TakeExamBody";

export default function TakeExam() {
  const { id, contestId, userId } = useParams();
  return (
    <>
      <TakeExamBody id={id} contestId={contestId} userId={userId} />
    </>
  );
}
