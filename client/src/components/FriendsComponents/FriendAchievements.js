import React from "react";
import AchievementBlock from "../UserManagementComponents/AchievementBlock";

class FriendAchievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      dateAdded: "1/10/2021",
    };
  }

  render() {
    return (
      <div className="AchievementBlock">
        <p className="AchievementHeading">Achievements!</p>
        <div className="UserAchievement">
          <AchievementBlock loop={16} />
        </div>
      </div>
    );
  }
}

export default FriendAchievements;
