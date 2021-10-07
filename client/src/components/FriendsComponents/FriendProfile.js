import React from "react";
import FriendProfileIconPair from "./FriendProfileIconPair";
import FriendProfileStats from "./FriendProfileStats";
import FriendAchievements from "./FriendAchievements";
import FriendWhiteLine from "./FriendWhiteLine";

class FriendProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      dateAdded: "1/10/2021",
    };
  }

  render() {
    return (
      <>
        <FriendProfileIconPair username={this.state.username} />
        <FriendProfileStats />
        <FriendWhiteLine />
        <FriendAchievements />
      </>
    );
  }
}

export default FriendProfile;
