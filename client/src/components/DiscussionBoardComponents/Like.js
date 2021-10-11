import React from "react";
import { Redirect } from "react-router-dom";
import "../../assets/css/DiscussionBoard.scss";
import HeartOutline from "../../assets/images/HeartOutline.png";
import HeartFilled from "../../assets/images/HeartFilled.png";

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.likeCount,
      unauth: false,
      clicked: false,
    };
  }

  likeComment() {
    fetch("/api/likeComment", {
      method: "PUT",
      body: JSON.stringify({
        CommentID: this.props.CommentID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          this.setState({ likeCount: this.state.likeCount + 1, clicked: true });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else if (res.status === 409) {
          res.json().then((body) => {
            console.log(body.errors);
          });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  unlikeComment() {
    fetch("/api/unlikeComment", {
      method: "PUT",
      body: JSON.stringify({
        CommentID: this.props.CommentID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          this.setState({
            likeCount: this.state.likeCount - 1,
            clicked: false,
          });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else if (res.status === 409) {
          res.json().then((body) => {
            console.log(body.errors);
          });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  render() {
    if (this.state.unauth) {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }
    return (
      <div className="CommentLike">
        <div
          className="HeartIconContainer"
          onClick={
            this.state.clicked
              ? () => this.unlikeComment()
              : () => this.likeComment()
          }
        >
          {!this.state.clicked ? (
            <img
              src={HeartOutline}
              width="20"
              height="20"
              className="HeartIcon"
              alt="LikeHeartOutline"
            />
          ) : (
            <img
              src={HeartFilled}
              width="20"
              height="20"
              className="HeartIcon"
              alt="LikeHeartFilled"
            />
          )}
        </div>
        <div className="LikeCount">{this.state.likeCount}</div>
      </div>
    );
  }
}

export default Like;
