import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/DiscussionBoard.scss";
import DiscussionBoardComments from "../components/DiscussionBoardComponents/DiscussionBoardComments";
import CommentInput from "../components/DiscussionBoardComponents/CommentInput";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";
import PriceArrow from "../components/PriceArrow";
import ClosingPrice from "../components/ClosingPrice";

class DiscussionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [], //Array containing all comments
      toDisplay: [],
      currentListingPrice: 0,
      unauth: false,
      searchString: "",
    };
    this.fetchAllComments = this.fetchAllComments.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static contextType = UserContext;

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }

  handleSearch(event) {
    let temp = [];
    for (const element of this.state.comments) {
      if (element.Comment.includes(this.state.searchString)) {
        temp.push(element);
      }
    }
    this.setState({ toDisplay: temp });
  }

  //Get all comments for a specific thread
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
            this.setState({ comments: body, toDisplay: body });
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

  //Used to check if the thread being looked at is real or not
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

  //Get the current listing price for the company's thread
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
    //Redirect the user to the Sign in page if they are unauthenticated
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
              ${this.state.currentListingPrice} &nbsp;
              <ClosingPrice
                currentPrice={this.state.currentListingPrice}
                code={this.props.match.params.id}
              />
              <PriceArrow
                currentPrice={this.state.currentListingPrice}
                code={this.props.match.params.id}
              />
            </div>
          </Link>
        </div>
        <div className="DiscussionBoardForm">
          <div className="CommentSearchTitle">Search through the comments!</div>

          <input
            className="searchTextfield form-control"
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearchStringChange}
            placeholder="Type some text here..."
          />
          <br />
          <button
            className="discussionBoardSearchButton"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
        <div className="CommentInputLineBlock">
          <div className="CommentInputLine"></div>
        </div>
        <div className="commentContainer">
          <DiscussionBoardComments comments={this.state.toDisplay} />
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
