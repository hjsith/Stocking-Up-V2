import React from "react";
import "../../assets/css/Achievement.scss";
import AchievementIcon from "../../assets/images/AchievementTrophyIcon.png";

class UnlockedAchievement extends React.Component {
  render() {
    return (
      <div className="achievementIconContainer">
        <img
          src={AchievementIcon}
          className="AchievementIcon"
          alt="Achievement Icon"
        />
      </div>
    );
  }
}

export default UnlockedAchievement;
