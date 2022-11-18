import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Banner = ({ image, title }) => {
  return (
    <Link to="/search?query=winter">
      <div className="container">
        <div className="overlay"></div>
        <div className="background">
          <img src={image} alt={title} />
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Banner;
