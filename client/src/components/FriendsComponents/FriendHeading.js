import React from "react";

class FriendHeading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="FriendHeading">{this.props.title}</h2>
      </>
    );
  }
}

export default FriendHeading;
