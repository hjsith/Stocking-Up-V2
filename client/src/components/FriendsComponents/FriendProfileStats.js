import React from "react";
import FriendStat from "./FriendStat";

class FriendProfileStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      dateAdded: "1/10/2021",
    };
  }

  render() {
    return (
      <div className="FriendBlock">
        <div className="FriendStatsTable">
          <table>
            <tbody>
              <tr>
                <td colspan="5">
                  <FriendStat statTitle="NetWorth" />
                </td>
                <td colspan="2">
                  <FriendStat statTitle="Rank" />
                </td>
                <td colspan="3">
                  <FriendStat statTitle="Difficulty" />
                </td>
                <td colspan="2">
                  <FriendStat statTitle="Friends" />
                </td>
                <td colspan="2">
                  <FriendStat statTitle="Posts" />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <FriendStat statTitle="Title" />
                </td>
                <td colspan="5">
                  <FriendStat statTitle="Date Joined" />
                </td>
                <td colspan="4">
                  <FriendStat statTitle="Friends Since" />
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
