import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <p>${parseFloat(props.x).toFixed(2)}</p>
    </header>
  );
};

export default Header;
