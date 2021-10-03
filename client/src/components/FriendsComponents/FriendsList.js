import FriendListItem from "./FriendListItem";
import React from "react";

class FriendsList extends React.Component {
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
    };
  }

  render() {
    return (
      <>
        <div className="OverallFriendsList">
          {this.state.friends.map((friend, index) => (
            <div>
              <FriendListItem
                key={friend.InvestorID}
                username={friend.Username}
                dateAdded={friend.DateAdded}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default FriendsList;
