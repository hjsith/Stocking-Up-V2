import React from "react";

const Funds = (props) => {
  return (
    <div>
      <h1> Funds Available: ${parseFloat(props.funds).toFixed(2)}</h1>
    </div>
  );
};

export default Funds;