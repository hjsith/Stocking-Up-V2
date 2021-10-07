import React from "react";
import FriendHeading from "./FriendHeading";
import FriendResults from "./FriendResults";
import { UserContext } from "../UserContext";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [], //State to store the search results
      currentSearch: "", //State to store the search string
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static contextType = UserContext; //Current logged in user's context

  //Hooks to text box change event
  handleSearchStringChange(event) {
    this.setState({ currentSearch: event.target.value }); //Updates state with latest results
  }

  //Handles the search based on the current search string
  handleSearch() {
    fetch(
      "/api/investor/username/similar?username=" + //Fetches API endpoint to find users with similar usernames
        this.state.currentSearch + //Current search string
        "&currentuser=" +
        this.context.user.name + //Excludes current user
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
          //Successful retrieval of results
          res.json().then((body) => {
            this.setState({ results: body }); //Set results state to retrieved results
          });
        } else if (res.status === 401) {
          //Unauthorised user
          this.setState({ unauth: true }); //Set the state to unauthorised (leads to redirect)
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
