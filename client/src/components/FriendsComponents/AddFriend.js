import React from "react";
import FriendHeading from "./FriendHeading";
import glass from "../../assets/images/glass.svg";
import FriendResults from "./FriendResults";
import { UserContext } from "../UserContext";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchString: "",
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
  }

  static contextType = UserContext;

  handleSearchStringChange(event) {
    fetch(
      "/api/investor/username/similar?username=" +
        event.target.value +
        "&currentuser=" +
        this.context.user.name +
        "&id=" +
        this.context.user.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

  handleSearch() {}

  render() {
    return (
      <>
        <FriendHeading title="Add a friend :)" />
        <div className="friendSearchInput">
          {" "}
          <input
            className="friendSearch"
            type="text"
            onChange={this.handleSearchStringChange}
            placeholder="Type in a username!"
          />
          <img src={glass} className="glass" />
        </div>
        <FriendResults results={this.state.results} pending={false} />
      </>
    );
  }
}

export default AddFriend;
