import React from "react";

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="CommentInputBlock">
        <div className="CommentInputLine"></div>
        Submit your own comment!
      </div>
    );
  }
}

export default CommentInput;
