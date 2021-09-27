import React from "react";
import "../../assets/css/MarketsOverview.scss";

class TitlePanel extends React.Component {
  render() {
    return <div className="TitlePanel"> {this.props.title} </div>;
  }
}

export default TitlePanel;
