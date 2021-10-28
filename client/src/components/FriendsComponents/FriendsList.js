import FriendListItem from "./FriendListItem";
import React from "react";
import { UserContext } from "../UserContext";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    setInterval(() => {
      fetch("/api/friends" + "?id=" + this.context.user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            friends: body,
          });
        });
      });
    }, 500);
  }

  render() {
    return (
      <>
        <div className="OverallFriendsList">
          {this.state.friends.map((friend, index) => (
            <div>
              <FriendListItem
                key={
                  friend.RequestingUsername == this.context.user.id
                    ? friend.AcceptingUsername
                    : friend.RequestingUsername
                }
                userId={
                  friend.RequestingUsername == this.context.user.id
                    ? friend.AcceptingUsername
                    : friend.RequestingUsername
                }
                colorNumber={3}
                dateAdded={friend.DateAdded}
                isSelected={
                  this.props.selectedUser ==
                  (friend.RequestingUsername == this.context.user.id
                    ? friend.AcceptingUsername
                    : friend.RequestingUsername)
                }
                selectedUserHandler={this.props.selectedUserHandler}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default FriendsList;
