import React from "react";
import VerticalWhiteLine from "./VerticalWhiteLine";

class FriendStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      statTitle: this.props.statTitle,
      statValue: this.props.statValue,
    };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        username: newProps.username,
        statTitle: newProps.statTitle,
        statValue: newProps.statValue,
      });
    }
  }

  render() {
    return (
      <div className="FriendStatGroup">
        <VerticalWhiteLine />
        <div className="FriendStat">
          <div className="FriendStatTitle">{this.state.statTitle}</div>
          <div className="FriendStatValue">{this.state.statValue}</div>
        </div>
      </div>
    );
  }
}

export default FriendStat;
