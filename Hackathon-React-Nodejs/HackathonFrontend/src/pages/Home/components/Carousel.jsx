import React from "react";
import carouselData from "../jsonData/CarouselData.json";

export default function Carousel({ scrollInterval }) {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {carouselData.map((data, index) => (
          <div
            className={`carousel-item ${index === 0 && "active"}`}
            data-bs-interval={scrollInterval}
            key={index}
          >
            <img
              src={data.path}
              className="d-block w-100 image-ratio"
              alt={`Carousel Image - ${index + 1}`}
            />
            <div className="carousel-caption d-none d-md-block background-dark border-radius">
              <h5>{data.title}</h5>
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
