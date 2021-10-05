import React from "react";
import graph from "../../assets/images/graph.png";
import "../../assets/css/QuoteManagement.scss";
// this section of the code is for the graph component which will be part of R2
const Graph = () => {
  return (
    <div className="image">
      <img src={graph} alt="Graph" />
    </div>
  );
};

export default Graph;
