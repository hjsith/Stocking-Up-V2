import React from "react";
import FriendProfileIconPair from "./FriendProfileIconPair";
import FriendProfileStats from "./FriendProfileStats";
import FriendAchievements from "./FriendAchievements";
import FriendWhiteLine from "./FriendWhiteLine";

class FriendProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username, //Stores username of friend
      dateAdded: "1/10/2021",
    };
  }

  render() {
    if (this.props.username == "") {
      return <h1>No user selected!</h1>;
    } else {
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
}

export default FriendProfile;
