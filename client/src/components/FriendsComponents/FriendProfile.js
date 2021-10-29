import React from "react";
import FriendProfileIconPair from "./FriendProfileIconPair";
import FriendProfileStats from "./FriendProfileStats";
import FriendAchievements from "./FriendAchievements";
import FriendWhiteLine from "./FriendWhiteLine";

class FriendProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRank: "",
      userName: "",
      userNetWorth: "",
      userDifficulty: "",
      userTitle: "",
      userFriendCount: "0",
      userPostCount: "0",
      userDateJoined: "",
      userId: this.props.username,
    };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({ userId: newProps.username }, () => {
        this.fetchesThings();
      });
      console.log(this.state);
    }
  }

  fetchesThings() {
    Promise.all([
      fetch("/api/investor?id=" + this.state.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
      fetch("/api/friends/count?userID=" + this.state.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
      fetch("/api/commentCount?userID=" + this.state.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    ]).then(([mainInfo, friends, posts]) => {
      this.setState({
        userRank: mainInfo.InvestorRanking,
        userName: mainInfo.Username,
        userNetWorth: "" + mainInfo.NetWorth,
        userDifficulty: mainInfo.InvestorDifficulty,
        userTitle: mainInfo.Title,
        userDateJoined: mainInfo.DateJoined,
        userFriendCount: friends.count,
        userPostCount: posts.count,
      });
    });
  }

  componentDidMount() {
    this.fetchesThings();
  }

  render() {
    return (
      <>
        <FriendProfileIconPair username={this.state.userName} />
        <FriendProfileStats
          userRank={this.state.userRank}
          userNetWorth={this.state.userNetWorth}
          userDifficulty={this.state.userDifficulty}
          userTitle={this.state.userTitle}
          userFriendCount={this.state.userFriendCount}
          userPostCount={this.state.userPostCount}
          userDateJoined={this.state.userDateJoined}
          dateAdded={this.props.dateAdded}
        />
        <FriendWhiteLine />
        <FriendAchievements />
      </>
    );
  }
}

export default FriendProfile;
