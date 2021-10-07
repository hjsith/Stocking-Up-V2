import React from "react";
import FriendHeading from "./FriendHeading";
import FriendResults from "./FriendResults";
import { UserContext } from "../UserContext";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchString: "",
      currentSearch: "",
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static contextType = UserContext;

  handleSearchStringChange(event) {
    this.setState({ currentSearch: event.target.value });
  }

  handleSearch() {
    fetch(
      "/api/investor/username/similar?username=" +
        this.state.currentSearch +
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
          <button onClick={this.handleSearch} className="glassButton" />
        </div>
        <FriendResults results={this.state.results} pending={false} />
      </>
    );
  }
}

export default AddFriend;
