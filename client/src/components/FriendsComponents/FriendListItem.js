import UserProfileIcon from "../UserProfileIcon";
import FriendWhiteLine from "./FriendWhiteLine";
import React from "react";

class FriendListItem extends React.Component {
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
        <div className="Friend">
          <table className="FriendListItem">
            <tbody>
              <tr>
                <td className="FriendIconRow" rowspan="2">
                  <div className="FriendIcon">
                    <UserProfileIcon
                      name={this.state.username}
                      colorNumber={1}
                      company={false}
                      size={80}
                    />
                  </div>
                </td>
                <td className="FriendUsername">
                  <div>{this.state.username}</div>
                </td>
              </tr>
              <tr>
                <td className="FriendDateAdded">
                  <div>Friends since: {this.props.dateAdded}</div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <FriendWhiteLine />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FriendListItem;
