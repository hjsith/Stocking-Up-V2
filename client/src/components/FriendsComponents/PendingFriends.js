import React from "react";
import FriendHeading from "./FriendHeading";
import FriendResults from "./FriendResults";
import FriendWhiteLine from "./FriendWhiteLine";
import { UserContext } from "../UserContext";

class PendingFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    setInterval(() => {
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
    }, 300);
  }
  render() {
    return (
      <>
        <FriendHeading title="Pending Friend Requests" />
        <FriendWhiteLine />
        <FriendResults results={this.state.results} pending={true} />
      </>
    );
  }
}

export default PendingFriends;
