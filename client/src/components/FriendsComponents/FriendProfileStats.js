import React from "react";
import FriendStat from "./FriendStat";

class FriendProfileStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      userRank: this.props.userRank,
      userNetWorth: this.props.userNetWorth,
      userDifficulty: this.props.userDifficulty,
      userTitle: this.props.userTitle,
      userFriendCount: this.props.userFriendCount,
      userPostCount: this.props.userPostCount,
      userDateJoined: this.props.userDateJoined,
      dateAdded: this.props.dateAdded,
    };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        username: newProps.username,
        userRank: newProps.userRank,
        userNetWorth: newProps.userNetWorth,
        userDifficulty: newProps.userDifficulty,
        userTitle: newProps.userTitle,
        userFriendCount: newProps.userFriendCount,
        userPostCount: newProps.userPostCount,
        userDateJoined: newProps.userDateJoined,
        dateAdded: newProps.dateAdded,
      });
    }
  }

  render() {
    return (
      <div className="FriendBlock">
        <div className="FriendStatsTable">
          <table>
            <tbody>
              <tr>
                <td colspan="5">
                  <FriendStat
                    statTitle="Net Worth"
                    statValue={this.state.userNetWorth}
                  />
                </td>
                <td colspan="2">
                  <FriendStat
                    statTitle="Rank"
                    statValue={this.state.userRank}
                  />
                </td>
                <td colspan="3">
                  <FriendStat
                    statTitle="Difficulty"
                    statValue={this.state.userDifficulty}
                  />
                </td>
                <td colspan="2">
                  <FriendStat
                    statTitle="Friends"
                    statValue={this.state.userFriendCount}
                  />
                </td>
                <td colspan="2">
                  <FriendStat
                    statTitle="Posts"
                    statValue={this.state.userPostCount}
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <FriendStat
                    statTitle="Title"
                    statValue={this.state.userTitle}
                  />
                </td>
                <td colspan="5">
                  <FriendStat
                    statTitle="Date Joined"
                    statValue={this.state.userDateJoined}
                  />
                </td>
                <td colspan="4">
                  <FriendStat
                    statTitle="Friends Since"
                    statValue={this.state.dateAdded}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FriendProfileStats;
