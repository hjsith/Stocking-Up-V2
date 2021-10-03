import React from "react";
import "../assets/css/Friends.scss";
import NavBar from "../components/NavBar";
import FriendsTitlePanel from "../components/FriendsComponents/FriendsTitlePanel";
import FriendsList from "../components/FriendsComponents/FriendsList";
import FriendProfile from "../components/FriendsComponents/FriendProfile";
import AddFriend from "../components/FriendsComponents/AddFriend";
import PendingFriends from "../components/FriendsComponents/PendingFriends";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          InvestorID: "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Admin",
          DateAdded: "01/10/2021",
        },
        {
          InvestorID: "09cdd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Jem",
          DateAdded: "02/10/2021",
        },
        {
          InvestorID: "09ddd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Ash",
          DateAdded: "03/10/2021",
        },
        {
          InvestorID: "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Admin",
          DateAdded: "01/10/2021",
        },
        {
          InvestorID: "09cdd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Jem",
          DateAdded: "02/10/2021",
        },
        {
          InvestorID: "09ddd9ca-8240-45b3-8ec8-56b1c1e2cb73",
          Username: "Ash",
          DateAdded: "03/10/2021",
        },
      ],
      rightView: [true, false, false],
    };
    this.handler = this.handler.bind(this);
    this.RightPanelView = this.RightPanelView.bind(this);
    this.WhichPanel = this.WhichPanel.bind(this);
  }

  handler(props) {
    this.setState({ rightView: [false, false, false] });
    this.setState({
      rightView: props,
    });
  }

  RightPanelView() {
    if (this.state.rightView[0])
      return <FriendProfile username={this.state.friends[0].Username} />;
    else if (this.state.rightView[1]) return <AddFriend />;
    else if (this.state.rightView[2]) return <PendingFriends />;
  }

  WhichPanel() {
    if (this.state.rightView[0]) return 0;
    else if (this.state.rightView[1]) return 1;
    else if (this.state.rightView[2]) return 2;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="Side1">
          <div>
            <div className="Panel1">
              <FriendsTitlePanel
                handler={this.handler}
                panelNumber={this.WhichPanel()}
              />
            </div>
            <div className="Panel2">
              <FriendsList />
            </div>
          </div>
        </div>
        <div className="Side2">
          <div className="Panel3">
            <this.RightPanelView />
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
