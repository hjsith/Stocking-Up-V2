import DiscussionBoardComment from "./DiscussionBoardComment";
import React from "react";

class DiscussionBoardComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
    };
  }

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
          {this.state.comments.map((element, index) => (
            <DiscussionBoardComment
              key={element.CommentID}
              comment={element.Comment}
              listingPrice={element.ListingPrice}
              likes={element.Likes}
              dateAdded={element.DateAdded}
              investorID={element.InvestorID}
              index={index + 1}
            />
          ))}
        </div>
      </>
    );
  }
}

export default DiscussionBoardComments;
