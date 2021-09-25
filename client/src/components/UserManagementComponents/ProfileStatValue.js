import React from "react";
import "../../assets/css/Profile.scss";

class ProfileStatValue extends React.Component {
  render() {
    return <div className="ProfileStatValue">{this.props.value}</div>;
  }
}

export default ProfileStatValue;
