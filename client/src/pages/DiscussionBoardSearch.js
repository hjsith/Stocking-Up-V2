import React from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/DiscussionBoardSearch.scss";
import DBoardSearchResults from "../components/DiscussionBoardComponents/DBoardSearchResults";

class DiscussionBoardSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
        {
          ThreadID: "TH-14D",
          ListingID: "14D",
          Title: "1414 DEGREES LIMITED",
          Description: "A discussion board for 1414 DEGREES LIMITED",
        },
      ],
      searchString: "",
      toDisplay: [
        {
          ThreadID: "TH-14D",
          ListingID: "14D",
          Title: "1414 DEGREES LIMITED",
          Description: "A discussion board for 1414 DEGREES LIMITED",
        },
      ],
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }

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
    // fetch("/api/thread" + "?search=" + this.state.searchString, {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // Successful login 200
    //       console.log("Hi");
    //     } else if (res.status === 409) {
    //       console.log("Failed to update password. Wat the heck?!");
    //     } else {
    //       console.log("Something unexpeceted went wrong ._.");
    //     }
    //   })
    //   .catch((exception) => {
    //     console.log("Error:", exception);
    //   });
    event.preventDefault();
  }

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
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  componentDidMount() {
    // this.fetchAllThreads();
  }

  render() {
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
            className="btn btn-primary discussionBoardSearchButton"
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
