import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/DiscussionBoard.scss";
import DiscussionBoardComments from "../components/DiscussionBoardComponents/DiscussionBoardComments";
import CommentInput from "../components/DiscussionBoardComponents/CommentInput";

class DiscussionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          CommentID: "132",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "20/08/2021",
          Comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ListingPrice: "$3.20",
          Likes: 20,
        },
        {
          CommentID: "123",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "DateAdded",
          Comment: "Some Comments",
          ListingPrice: "$3.20",
          Likes: 20,
        },
        {
          CommentID: "4",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "DateAdded",
          Comment: "Some Comments",
          ListingPrice: "$3.20",
          Likes: 20,
        },
        {
          CommentID: "1",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "DateAdded",
          Comment: "Some Comments",
          ListingPrice: "$3.20",
          Likes: 20,
        },
        {
          CommentID: "2",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "DateAdded",
          Comment: "Some Comments",
          ListingPrice: "$3.20",
          Likes: 20,
        },
        {
          CommentID: "3",
          InvestorID: "Something",
          ThreadID: "ThreadID",
          DateAdded: "DateAdded",
          Comment: "Some Comments",
          ListingPrice: "$3.20",
          Likes: 20,
        },
      ],
      searchString: "",
      authedPage: true,
    };
  }

  fetchThread() {
    console.log("Fetched thread information!");
  }

  fetchAllComments() {
    console.log("Fetched all Comments!");
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
    //     } else {
    //       console.log("Something unexpected went wrong ._.");
    //     }
    //   })
    //   .catch((exception) => {
    //     console.log("Error:", exception);
    //   });
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
    //     } else {
    //       console.log("Something unexpected went wrong ._.");
    //     }
    //   })
    //   .catch((exception) => {
    //     console.log("Error:", exception);
    //   });
  }

  componentDidMount() {
    this.verifyPage();
    this.fetchAllComments();
  }

  render() {
    if (this.state.authedPage == false) {
      return <></>;
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
          <a href="#SomeCompanyURL" className="ToCompanyButton">
            <div className="CompanyButtonText">
              View {this.props.match.params.id} Company Page
            </div>
            <div className="CompanyButtonListingPrice">
              $5.20 <span className="CompanyButtonListingChange">(+0.08)</span>
            </div>
          </a>
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
