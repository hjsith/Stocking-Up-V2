import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/DiscussionBoardSearch.scss";

class DiscussionBoardSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchString: "",
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }
  handleSubmit(event) {
    console.log("Submitted!");
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

  render() {
    return (
      <>
        <NavBar />
        <div className="discussionBoardSearchTitle">
          <h1>Company Search</h1>
        </div>

        <form
          onSubmit={this.handleSubmit}
          className="DiscussionBoardSearchForm"
        >
          <input
            className="searchTextfield form-control"
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearchStringChange}
            placeholder="Type an ASX-listed company code or name here..."
          />
          <input
            className="btn btn-primary discussionBoardSearchButton"
            type="submit"
            value="Search"
          />
        </form>

        <br />
      </>
    );
  }
}

export default DiscussionBoardSearch;
