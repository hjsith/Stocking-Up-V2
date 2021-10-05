import React from "react";
//this section of the code displays the investor's current funds on the quote management page
const Funds = (props) => {
  return (
    <div>
      <h1> Funds Available: ${props.currentFunds}</h1>
    </div>
  );
};

export default Funds;
