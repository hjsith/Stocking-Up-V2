import UserProfileIcon from "../UserProfileIcon";
import FriendWhiteLine from "./FriendWhiteLine";
import circle from "../../assets/images/pending.svg";
import React from "react";

class FriendListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      dateAdded: this.props.dateAdded,
    };
  }

  componentDidMount() {
    fetch("/api/investor" + "?id=" + this.props.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          username: body.Username,
        });
      });
    });
  }

  render() {
    return (
      <a>
        <div className="FriendBlock">
          <div className="Friend">
            <table className="FriendListItem">
              <tbody>
                <tr>
                  <td className="SelectedRow" rowspan="2">
                    <div className="SelectedRowIcon">
                      <img src={circle} />
                    </div>
                  </td>
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
      </a>
    );
  }
}

export default FriendListItem;
