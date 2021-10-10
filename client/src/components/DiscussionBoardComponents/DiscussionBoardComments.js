import DiscussionBoardComment from "./DiscussionBoardComment";
import React from "react";

const commentsPerPage = 50;

class DiscussionBoardComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      commentsToShow: [],
      currentPage: 0,
      buttons: [],
    };
    this.handleFormButtonClick = this.handleFormButtonClick.bind(this);
  }

  handleFormButtonClick(pageNumber) {
    this.setState({
      currentPage: pageNumber,
      commentsToShow: this.state.comments.slice(
        commentsPerPage * pageNumber,
        commentsPerPage * pageNumber + commentsPerPage
      ),
    });
  }

  displayControls() {
    var rows = [];

    //Create pagination controls for display
    rows.push(
      <div
        className={"FormButton"}
        onClick={this.handleFormButtonClick.bind(null, 0)}
      >
        &lt;&lt;
      </div>
    );
    if (this.state.currentPage - 2 >= 0) {
      rows.push(this.state.buttons[this.state.currentPage - 2]);
    }
    if (this.state.currentPage - 1 >= 0) {
      rows.push(this.state.buttons[this.state.currentPage - 1]);
    }
    rows.push(this.state.buttons[this.state.currentPage]);
    if (this.state.currentPage + 1 <= this.props.comments.length - 1) {
      rows.push(this.state.buttons[this.state.currentPage + 1]);
    }
    if (this.state.currentPage + 2 <= this.props.comments.length - 1) {
      rows.push(this.state.buttons[this.state.currentPage + 2]);
    }
    rows.push(
      <div
        className={"FormButton"}
        onClick={this.handleFormButtonClick.bind(
          null,
          Math.ceil(this.props.comments.length / commentsPerPage) - 1
        )}
      >
        &gt;&gt;
      </div>
    );
    return rows;
  }

  createControls() {
    var rows = [];
    for (
      var i = 0;
      i < Math.ceil(this.props.comments.length / commentsPerPage);
      i++
    ) {
      rows.push(
        <div
          className={"FormButton"}
          onClick={this.handleFormButtonClick.bind(null, i)}
        >
          {i + 1}
        </div>
      );
    }
    this.setState({ buttons: rows });
  }

  //Check if props have updated or not
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        comments: this.props.comments,
        commentsToShow: this.props.comments.slice(0, commentsPerPage),
      });
      this.createControls();
    }
  }

  componentDidMount() {
    this.createControls();
  }

  render() {
    return (
      <>
        <div className="AllComments">
          <div className="listControl">{this.displayControls()}</div>
          {this.state.comments.length == 0 ? (
            <div className="EmptyMessage">
              There are no comments yet on this discussion board. Be the first
              one to comment!
            </div>
          ) : (
            this.state.commentsToShow.map((element, index) => (
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
