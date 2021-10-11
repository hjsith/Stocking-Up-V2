import UserProfileIcon from "../UserProfileIcon";
import React from "react";

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
                      size={140}
                    />
                  </div>
                </td>
                <td className="FriendProfileUsername">
                  <div>{this.state.username}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FriendProfile;
