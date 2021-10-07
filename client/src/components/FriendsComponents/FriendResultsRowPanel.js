import React from "react";
import UserProfileIcon from "../UserProfileIcon";
import { UserContext } from "../UserContext";

class FriendResultsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false, //State to store button disabled status
      showRow: true, //Set to false when pending request is responded to
      results: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
    this.isPending = this.isPending.bind(this);
  }

  static contextType = UserContext; //Current logged in user's context

  //Handles 'add' button click for 'Add friend'
  handleAdd() {
    //Posts add friend request to API endpoint
    fetch("/api/friends/add", {
      method: "POST",
      body: JSON.stringify({
        rId: this.context.user.id, //Requesting user's id
        aId: this.props.acc, //Accepting user's id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          //Friend Request created
          res.json().then((body) => {
            this.setState({ buttonDisabled: true }); //Disables add button if successful
          });
        } else if (res.status === 401) {
          this.setState({ unauth: true }); //User is unauthorised
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  //Handles 'Accept' button click for 'Pending friends'
  handleAccept() {
    //Patches add friend request to API endpoint
    fetch("/api/friends/accept", {
      method: "PATCH", //
      body: JSON.stringify({
        rId: this.props.acc, //Requesting user's id
        aId: this.context.user.id, //Accepting user's id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          //OK
          this.setState({ buttonDisabled: true }); //Disables button
          this.setState({ showRow: false }); //Removes row from list
        } else if (res.status === 401) {
          this.setState({ unauth: true }); //User is unauthorised
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  //Handles 'Deny' button click for 'Pending friends'
  handleDeny() {
    //Deletes friend request through API endpoint
    fetch("/api/friends/deny", {
      method: "DELETE",
      body: JSON.stringify({
        rId: this.props.acc, //Requesting user's id
        aId: this.context.user.id, //Accepting user's id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ buttonDisabled: true }); //Disables button
          this.setState({ showRow: false }); //Removes row from list
        } else if (res.status === 401) {
          this.setState({ unauth: true }); //User is unauthorised
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  //Checks if current view is Pending, conditional rendering
  isPending() {
    if (!this.props.pending) {
      return (
        <div className="ButtonContainer">
          <button
            className={
              this.state.buttonDisabled
                ? "ConfirmButtonDisabled"
                : "GreenFriendConfirmButton"
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
