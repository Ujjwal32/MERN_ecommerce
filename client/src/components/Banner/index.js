import React from "react";
import "./index.css";

const Banner = ({ image, title }) => {
  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="background">
        <img src={image} alt={title} />
      </div>
      <div className="title">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Banner;
