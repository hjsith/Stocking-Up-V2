import UserProfileIcon from "../UserProfileIcon";
import FriendWhiteLine from "./FriendWhiteLine";
import circle from "../../assets/images/pending.svg";
import React from "react";

class FriendListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", //Stores current friend's username
      dateAdded: this.props.dateAdded,
    };
    this.selectUser = this.selectUser.bind(this);
    this.selectIcon = this.selectIcon.bind(this);
  }

  //Once the component is mounted, code below is executed
  componentDidMount() {
    //Fetches API endpoint to get details of investor
    fetch("/api/investor" + "?id=" + this.props.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          username: body.Username, //Set username state to investor username
        });
      });
    });
  }

  selectUser() {
    this.props.selectedUserHandler(this.props.userId);
  }

  selectIcon() {
    if (this.props.isSelected) {
      return (
        <td className="SelectedRow" rowspan="2">
          <div className="SelectedRowIcon">
            <img src={circle} />
          </div>
        </td>
      );
    } else {
      return (
        <td className="SelectedRow" rowspan="2">
          <div className="SelectedRowIcon">
            <img />
          </div>
        </td>
      );
    }
  }

  render() {
    return (
      <div className="FriendBlock" onClick={this.selectUser}>
        <div className="Friend">
          <table className="FriendListItem">
            <tbody>
              <tr>
                <this.selectIcon />
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
                <td colspan="3">
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
