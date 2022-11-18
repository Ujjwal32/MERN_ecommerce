import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "5rem",
        backgroundColor: "#4fc4c9",
        display: "grid",
        placeItems: "center",
        marginTop: "1.5rem",
        color: "white",
      }}
    >
      All rights reserved. Buy it. {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
