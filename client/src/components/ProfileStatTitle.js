import React from "react";
import "../assets/css/Profile.scss";

class ProfileStatTitle extends React.Component {
  render() {
    return <div className="ProfileStatTitle">{this.props.title}</div>;
  }
}

export default ProfileStatTitle;
