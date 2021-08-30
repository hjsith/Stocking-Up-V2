import React from "react";
import "../assets/css/Profile.scss";
import ProjectStatTitle from "../components/ProfileStatTitle";
import ProjectStatValue from "../components/ProfileStatValue";

class ProjectStat extends React.Component {
  render() {
    return (
      <div className="ProfileStatBlock">
        <ProjectStatTitle title={this.props.title} />
        <ProjectStatValue value={this.props.value} />
      </div>
    );
  }
}

export default ProjectStat;
