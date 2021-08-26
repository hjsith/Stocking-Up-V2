import React from "react";
import "../assets/css/PortfolioPage.scss";

class PanelTitle extends React.Component {
  render() {
    return <div className="PanelTitle"> {this.props.title} </div>;
  }
}

export default PanelTitle;
