import React from "react";
import FriendHeading from "./FriendHeading";
import FriendResults from "./FriendResults";
import FriendWhiteLine from "./FriendWhiteLine";
import { UserContext } from "../UserContext";
import refresh from "../../assets/images/refresh-icon.svg";

class PendingFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  static contextType = UserContext;

  componentDidMount() {
    fetch("/api/friends/pending?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ results: body });
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

  refresh() {
    fetch("/api/friends/pending?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ results: body });
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

  render() {
    return (
      <>
        <div className="PendingLine">
          <FriendHeading title="Pending Friend Requests" />
          <button onClick={this.refresh}>
            <img src={refresh} />
          </button>
        </div>
        <FriendWhiteLine />
        <FriendResults results={this.state.results} pending={true} />
      </>
    );
  }
}

export default PendingFriends;
