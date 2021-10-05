import React from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/DiscussionBoardSearch.scss";
import DBoardSearchResults from "../components/DiscussionBoardComponents/DBoardSearchResults";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class DiscussionBoardSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [], //Array containing all threads
      searchString: "",
      toDisplay: [], //Array containing threads that are to be displayed for pagination
      unauth: false,
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static contextType = UserContext;

  //Handle input changes for the search textbox
  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }

  //Update displayed threads that match the search string
  handleSearch(event) {
    let temp = [];
    for (const element of this.state.results) {
      if (
        element.ThreadID.includes(this.state.searchString) ||
        element.ListingID.includes(this.state.searchString) ||
        element.Title.includes(this.state.searchString)
      ) {
        temp.push(element);
      }
    }
    this.setState({ toDisplay: temp });
  }

  //Get all threads
  fetchAllThreads() {
    fetch("/api/threads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ results: body, toDisplay: body });
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

  componentDidMount() {
    this.fetchAllThreads();
  }

  render() {
    //Redirect to sign in page if the user is unauthenticated
    if (this.state.unauth || this.context.user.name === "") {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }

    return (
      <div className="DiscussionBoardSearch">
        <NavBar />
        <div className="discussionBoardSearchTitle">
          <h1>Company Discussion Board Search</h1>
        </div>
        <br />
        <div className="DiscussionBoardSearchForm">
          <input
            className="searchTextfield form-control"
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearchStringChange}
            placeholder="Type an ASX-listed company code or name here..."
          />
          <br />
          <button
            className="discussionBoardSearchButton"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
        <br />
        <br />
        <DBoardSearchResults threads={this.state.toDisplay} />
        <br />
        <br />
      </div>
    );
  }
}

export default DiscussionBoardSearch;
