import UserProfileIcon from "../UserProfileIcon";
import React from "react";
import Like from "./Like";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class DiscussionBoardComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      unauth: false,
    };
  }

  static contextType = UserContext;

  fetchInvestorInformation() {
    fetch("/api/investor" + "?id=" + this.props.investorID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ username: body.Username });
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
    this.fetchInvestorInformation();
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
          <div className="CommentDateAdded">
            {this.props.dateAdded.substring(0, 10) +
              " " +
              this.props.dateAdded.substring(11, 19)}
          </div>
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
