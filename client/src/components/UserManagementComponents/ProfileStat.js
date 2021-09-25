import React from "react";
import "../../assets/css/Profile.scss";
import ProfileStatTitle from "./ProfileStatTitle";
import ProfileStatValue from "./ProfileStatValue";

class ProfileStat extends React.Component {
  render() {
    return (
      <div className="ProfileStatBlock">
        <ProfileStatTitle title={this.props.title} />
        <ProfileStatValue value={this.props.value} />
      </div>
    );
  }
}

export default ProfileStat;
