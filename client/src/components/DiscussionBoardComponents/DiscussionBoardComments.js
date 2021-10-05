import DiscussionBoardComment from "./DiscussionBoardComment";
import React from "react";

class DiscussionBoardComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
    };
  }

  //Check if props have updated or not
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        comments: this.props.comments,
      });
    }
  }

  render() {
    return (
      <>
        <div className="AllComments">
          {this.state.comments.length == 0 ? ( //If there are no comments on the thread, display a message
            <div className="EmptyMessage">
              There are no comments yet on this discussion board. Be the first
              one to comment!
            </div>
          ) : (
            this.state.comments.map((element, index) => (
              <DiscussionBoardComment
                key={element.CommentID}
                comment={element.Comment}
                listingPrice={element.ListingPrice}
                likes={element.Likes}
                dateAdded={element.DateAdded}
                investorID={element.InvestorID}
                index={index + 1}
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default DiscussionBoardComments;
