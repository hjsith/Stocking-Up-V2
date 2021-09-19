import React from "react";
import "../assets/css/Friends.scss";
import FriendsTitlePanel from "../components/FriendsComponents/FriendsTitlePanel";
import NavBar from "../components/NavBar";

class Friends extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="BackgroundPanel1">
          <FriendsTitlePanel />
        </div>
        <div className="BackgroundPanel2">
          <h2>Bye</h2>
        </div>
      </div>
    );
  }
}

export default Friends;
