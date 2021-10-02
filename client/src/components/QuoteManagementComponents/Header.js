import React from "react";

const Header = (props) => {

  return (
    <header className="header">
      <h1>
        {props.title} - {props.company}
      </h1>
      <p>${props.currentPrice}</p>
    </header>
  );
};

export default Header;
