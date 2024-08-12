import React from "react";
import "./Home.css";
import Navbar from "../UtilityComponents/Navbar";
import Carousel from "./components/Carousel";
import HomeBody from "./components/HomeBody";

export default function Home() {
  return (
    <>
      <Navbar page="home" />
      <Carousel scrollInterval={3000} />
      <HomeBody />
    </>
  );
}
