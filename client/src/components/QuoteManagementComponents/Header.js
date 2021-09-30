import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <p>${props.currentPrice}</p>
    </header>
  );
};

export default Header;
