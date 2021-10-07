import React from "react";
import UserProfileIcon from "../UserProfileIcon";
import { UserContext } from "../UserContext";

class FriendResultsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false,
      showRow: true,
      results: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
    this.isPending = this.isPending.bind(this);
  }

  static contextType = UserContext;

  handleAdd() {
    fetch("/api/friends/add", {
      method: "POST",
      body: JSON.stringify({
        rId: this.context.user.id,
        aId: this.props.acc,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ buttonDisabled: true });
          });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  handleAccept() {
    fetch("/api/friends/accept", {
      method: "PATCH",
      body: JSON.stringify({
        rId: this.props.acc,
        aId: this.context.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ buttonDisabled: true });
          this.setState({ showRow: false });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  handleDeny() {
    fetch("/api/friends/deny", {
      method: "DELETE",
      body: JSON.stringify({
        rId: this.props.acc,
        aId: this.context.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ buttonDisabled: true });
          this.setState({ showRow: false });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  isPending() {
    if (!this.props.pending) {
      return (
        <div className="ButtonContainer">
          <button
            className={
              this.state.buttonDisabled
                ? "ConfirmButtonDisabled"
                : "GreenConfirmButton"
            }
            disabled={this.state.buttonDisabled}
            onClick={this.handleAdd}
          >
            {this.state.buttonDisabled ? "Sent" : "Add"}
          </button>
        </div>
      );
    } else {
      return (
        <div className="ButtonContainer">
          <button className="GreenAcceptButton" onClick={this.handleAccept}>
            Accept
          </button>
          <button className="RedDenyButton" onClick={this.handleDeny}>
            Deny
          </button>
        </div>
      );
    }
  }

  render() {
    if (!this.state.showRow) return <div></div>;
    else {
      return (
        <div className="FriendResultsRowPanel">
          <table>
            <tbody>
              <tr>
                <td className="FriendResultIcon">
                  <UserProfileIcon
                    name={this.props.username}
                    colorNumber={this.props.colourNumber}
                    company={false}
                    size={50}
                  />
                </td>
                <td className="FriendResultName">{this.props.username}</td>
                <td>
                  <this.isPending />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default FriendResultsRow;
