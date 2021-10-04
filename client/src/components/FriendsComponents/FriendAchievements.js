import React from "react";
import AchievementBlock from "../UserManagementComponents/AchievementBlock";

class FriendAchievements extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FriendAchievementBlock">
        <p className="FriendAchievementHeading">Achievements!</p>
        <div className="FriendUserAchievement">
          <AchievementBlock loop={16} />
        </div>
      </div>
    );
  }
}

export default FriendAchievements;
