import React from "react";
import "../../assets/css/QuoteManagement.scss";

const Change = (props) => {
  return (
    <div class="secondpanel">
      <h4>Today's change</h4>
      <p>{props.change}</p>
    </div>
  );
};

export default Change;
