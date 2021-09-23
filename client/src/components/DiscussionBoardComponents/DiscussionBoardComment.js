import UserProfileIcon from "../UserProfileIcon";
import React from "react";
import Like from "./Like";

class DiscussionBoardComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Hjsith",
    };
  }

  fetchInvestorInformation(userID) {
    console.log("Fetched investor information!");
    // fetch("/api/investor" + "?id=" + userID, {
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

  render() {
    return (
      <div className="CommentBlock">
        <div className="UserBlock">
          <UserProfileIcon
            name={this.state.username}
            colorNumber={1}
            company={false}
            size={70}
          />
          <div className="userBlockUserName">{this.state.username}</div>
        </div>
        <div className="Comment">
          <div className="CommentDateAdded">{this.props.dateAdded}</div>
          <div className="CommentText">{this.props.comment}</div>
          <div className="CommentListingPrice">
            Price: {this.props.listingPrice}
          </div>
          <div className="CommentNumber">#{this.props.index}</div>
          <div className="CommentLikes">
            <Like
              likeCount={this.props.likes}
              InvestorID={this.props.investorID}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionBoardComment;
