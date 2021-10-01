import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/DiscussionBoard.scss";
import DiscussionBoardComments from "../components/DiscussionBoardComponents/DiscussionBoardComments";
import CommentInput from "../components/DiscussionBoardComponents/CommentInput";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class DiscussionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      searchString: "",
      currentListingPrice: 0,
      unauth: false,
    };
    this.fetchAllComments = this.fetchAllComments.bind(this);
  }

  static contextType = UserContext;

  fetchThread() {
    console.log("Fetched thread information!");
  }

  fetchAllComments() {
    fetch("/api/comments" + "?ThreadID=" + this.props.match.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ comments: body });
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

  fetchListingPrice() {
    console.log("Fetched listing price!");
  }

  postNewComment() {
    console.log("Posted new comment!");
  }

  verifyPage() {
    // fetch("/api/comments" + "?ThreadID=" + this.props.match.params.id, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // Successful login 200
    //       res.json().then((body) => {
    //         this.setState({ results: body, toDisplay: body });
    //       });
    //     } else if (res.status === 401) {
    //        this.setState({ unauth: true });
    //      } else {
    //       console.log("Something unexpected went wrong ._.");
    //     }
    //   })
    //   .catch((exception) => {
    //     console.log("Error:", exception);
    //   });
  }

  fetchCurrentListingPrice() {
    fetch("/api/price?code=" + this.props.match.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          this.setState({ currentListingPrice: body.price });
        });
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      }
    });
  }

  componentDidMount() {
    this.verifyPage();
    this.fetchAllComments();
    this.fetchCurrentListingPrice();
  }

  render() {
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
      <>
        <NavBar />
        <div className="DiscussionBoardTitlePanel">
          <h1 className="DiscussionBoardTitle">
            Discussion Board for {this.props.match.params.id}
          </h1>
          <div className="DiscussionBoardDescription">
            {" "}
            This is the description of the {this.props.match.params.id}. It
            gives an overview of the company.
          </div>
          <Link
            to={{
              pathname: "/QuoteManagement",
              state: { listingID: this.props.match.params.id },
            }}
            className="ToCompanyButton"
          >
            <div className="CompanyButtonText">
              View {this.props.match.params.id} Company Page
            </div>

            <div className="CompanyButtonListingPrice">
              ${this.state.currentListingPrice}{" "}
              <span className="CompanyButtonListingChange"> (+0.08)</span>
            </div>
          </Link>
        </div>
        <div className="commentContainer">
          <DiscussionBoardComments comments={this.state.comments} />
        </div>
        <div className="CommentInputContainer">
          <CommentInput
            threadID={this.props.match.params.id}
            updateComments={this.fetchAllComments}
          />
        </div>
      </>
    );
  }
}

export default DiscussionBoard;
