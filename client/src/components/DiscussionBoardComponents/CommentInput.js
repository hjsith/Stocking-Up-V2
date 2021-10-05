import React from "react";
import "../../assets/css/DiscussionBoardSearch.scss";
import { UserContext } from "../UserContext";
import moment from "moment";
import { Redirect } from "react-router-dom";

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errorMessage: "",
      listingPrice: 0.0,
      unauth: false,
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

  //Clears the textfield
  handleClear() {
    document.getElementById("commentInputTextField").value = "";
  }

  //Attempt to create a new comment for the currently signed in user
  handleSubmit() {
    //Get the liting price for the new comment
    fetch("/api/price?code=" + this.props.threadID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          this.setState({ listingPrice: body.price });
          //Attempt to create a new comment
          fetch("/api/newComment", {
            method: "POST",
            body: JSON.stringify({
              InvestorID: this.context.user.id,
              ThreadID: "TH-" + this.props.threadID,
              DateAdded: moment(new Date(), "DD MM YYYY hh:mm:ss"),
              Comment: document.getElementById("commentInputTextField").value,
              ListingPrice: this.state.listingPrice,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status === 201) {
                // Successful post 201
                this.setState({ errorMessage: "Comment Submitted!" });
                document.getElementById("commentInputTextField").value = ""; //Clear the textfield upon successful comment submission
                this.props.updateComments(); //Attempt to update the list of shown comments on the discussion board
              } else if (res.status === 401) {
                this.setState({ unauth: true });
              } else {
                console.log("Something unexpected went wrong ._.");
              }
            })
            .catch((exception) => {
              console.log("Error:", exception);
            });
        });
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      }
    });
  }

  render() {
    //Redirect the user back to the Sign In page if they are unauthenticated
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
