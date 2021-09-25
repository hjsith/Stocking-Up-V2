import React from "react";
import "../../assets/css/Achievement.scss";
import AchievementIcon from "../../assets/images/GreyAchievementTrophyIcon.png";

class LockedAchievement extends React.Component {
  render() {
    return (
      <div className="achievementIconContainer">
        <img
          src={AchievementIcon}
          className="AchievementIcon"
          alt=" Locked Achievement Icon"
        />
      </div>
    );
  }
}

export default LockedAchievement;
