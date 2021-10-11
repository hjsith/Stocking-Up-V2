import React from "react";
import "../../assets/css/Profile.scss";
import ProfileStat from "./ProfileStat";

class ProfileStatTable extends React.Component {
  render() {
    return (
      <div className="ProfileStat">
        <table className="ProfileStatTable">
          <tr>
            <td>
              <ProfileStat title="Rank" value={this.props.rank} />
            </td>
            <td>
              <ProfileStat
                title="Net Worth"
                value={"$" + this.props.netWorth}
              />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat
                title="Difficulty"
                value={this.props.userDifficulty}
              />
            </td>
            <td>
              <ProfileStat title="Title" value={this.props.title} />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat title="Friends" value={this.props.friendCount} />
            </td>
            <td>
              <ProfileStat title="Posts" value={this.props.postCount} />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat title="Date Joined" value={this.props.dateJoined} />
            </td>
            <td>
              <ProfileStat
                title="Days till next simulator wipe"
                value={this.props.simualationDate}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ProfileStatTable;
