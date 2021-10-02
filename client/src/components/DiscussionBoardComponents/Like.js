import React from "react";

class Like extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="CommentLike">{this.props.likeCount} Likes</div>;
  }
}

export default Like;
