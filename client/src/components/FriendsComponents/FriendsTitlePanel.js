import React from "react";
import FriendButton from "./FriendButton";
import { UserContext } from "../UserContext";

class FriendsTitlePanel extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <div class="container" className="FriendsTitlePanel">
        <div class="row">
          <div class="col-sm d-flex justify-content-center">
            <h1>Friends!</h1>
          </div>
          <div class="col-sm d-flex justify-content-center">
            {" "}
            <FriendButton
              title="Add Friends?"
              handler={this.props.handler}
              panelNumber={this.props.panelNumber}
            />
          </div>
          <div class="w-100"></div>
          <div class="col-sm d-flex justify-content-center">
            {" "}
            <p>Your username is: {this.context.user.name}</p>
          </div>
          <div class="col-sm d-flex justify-content-center">
            {" "}
            <FriendButton
              title="Pending Requests"
              handler={this.props.handler}
              panelNumber={this.props.panelNumber}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsTitlePanel;
