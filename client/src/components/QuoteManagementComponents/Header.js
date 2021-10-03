import React from "react";
// this section of the code displays the listing ID, and ASX code based on the user input.
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
