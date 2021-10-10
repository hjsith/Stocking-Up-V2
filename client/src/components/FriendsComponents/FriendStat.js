import React from "react";
import VerticalWhiteLine from "./VerticalWhiteLine";

class FriendStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      statTitle: this.props.statTitle,
    };
  }

  render() {
    return (
      <div className="FriendStatGroup">
        <VerticalWhiteLine />
        <div className="FriendStat">
          <div className="FriendStatTitle">{this.state.statTitle}</div>
          <div className="FriendStatValue">{this.state.statTitle}</div>
        </div>
      </div>
    );
  }
}

export default FriendStat;
