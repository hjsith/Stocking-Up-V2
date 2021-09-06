import React from "react";
import "../assets/css/Achievement.scss";
import UnlockedAchievement from "../components/UnlockedAchievement";
import LockedAchievement from "../components/LockedAchievement";

class Achievement extends React.Component {
  render() {
    let icon;
    if (this.props.achievementStatus) {
      icon = <UnlockedAchievement />;
    } else {
      icon = <LockedAchievement />;
    }

    return (
      <div className="achievementContainer">
        {icon}
        <div className="achievementTitle">{this.props.title}</div>
        <div className="achievementDescription">{this.props.description}</div>
      </div>
    );
  }
}

export default Achievement;
