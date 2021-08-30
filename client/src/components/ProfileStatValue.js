import React from "react";
import "../assets/css/Profile.scss";

class ProjectStatValue extends React.Component {
  render() {
    return <div className="ProjectStatValue">{this.props.value}</div>;
  }
}

export default ProjectStatValue;
