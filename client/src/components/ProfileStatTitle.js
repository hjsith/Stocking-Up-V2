import React from "react";
import "../assets/css/Profile.scss";

class ProjectStatTitle extends React.Component {
  render() {
    return <div className="ProjectStatTitle">{this.props.title}</div>;
  }
}

export default ProjectStatTitle;
