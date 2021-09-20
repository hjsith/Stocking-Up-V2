import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/DiscussionBoard.scss";
import DiscussionBoardComments from "../components/DiscussionBoardComponents/DiscussionBoardComments";
class DiscussionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      searchString: "",
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

  componentDidMount() {
    this.fetchAllComments();
  }

  render() {
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
        <DiscussionBoardComments />
      </>
    );
  }
}

export default DiscussionBoard;
