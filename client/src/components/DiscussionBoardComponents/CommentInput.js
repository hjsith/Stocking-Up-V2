import React from "react";

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errorMessage: "",
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClear() {
    document.getElementById("commentInputTextField").value = "";
  }

  handleSubmit() {
    console.log("Comment submitted!");
    let listingPrice;
    let investorID;
    // fetch("/api/listing", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     InvestorID: "",
    //     ThreadID: this.props.threadID,
    //     DateAdded: "2016-01-01 00:00:00+00:00",
    //     Comment:document.getElementById("commentInputTextField").value,
    //     ListingPrice: "",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })

    // fetch("/api/investor", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     InvestorID: "",
    //     ThreadID: this.props.threadID,
    //     DateAdded: "2016-01-01 00:00:00+00:00",
    //     Comment:document.getElementById("commentInputTextField").value,
    //     ListingPrice: "",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })

    fetch("/api/newComment", {
      method: "POST",
      body: JSON.stringify({
        InvestorID: "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73",
        ThreadID: this.props.threadID,
        DateAdded: "2016-01-01 00:00:00+00:00", //Waiting for merge from Order with moment package to use
        Comment: document.getElementById("commentInputTextField").value,
        ListingPrice: 0.11,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          // Successful post 201
          this.setState({ errorMessage: "Comment Submitted!" });
          document.getElementById("commentInputTextField").value = "";
          this.props.fetchAllComments();
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
      <div className="CommentInputBlock">
        <div className="CommentInputLine"></div>
        <div className="CommentInputTitle">Submit your own comment!</div>
        <textarea
          id="commentInputTextField"
          name="commentInput"
          rows="4"
          cols="50"
          placeholder="Type your comment here!"
        ></textarea>
        <div className="CommentInputButtons">
          <div className="CommentInputErrorMessage">
            {this.state.errorMessage}
          </div>
          <button className="CommentInputClear" onClick={this.handleClear}>
            Clear
          </button>
          <button className="CommentInputSubmit" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
