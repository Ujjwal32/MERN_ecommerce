import React from "react";
import { Link } from "react-router-dom";
import "./category.css";

const CategoryOption = ({ left, right }) => {
  return (
    <div className="category_container">
      <Link to="/category/men" className="box">
        <div>
          <img src={left.image} alt={left.title} />
          <h1>{left.title}</h1>
        </div>
      </Link>
      <Link to="/category/women" className="box">
        <div>
          <img src={right.image} alt={right.title} />
          <h1>{right.title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default CategoryOption;
