import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/Profile.scss";
import AchievementBlock from "../components/AchievementBlock";
import UserProfileIcon from "../components/UserProfileIcon";
import ProfileStatTable from "../components/ProfileStatTable";
import Popup from "../components/Popup";
import VerticalLine from "../components/VerticalLine";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        snackBarMessage: this.props.location.state.snackBarMessage,
      });
    }
  }

  render() {
    return (
      <div className="ProfileContainer">
        <NavBar />
        <div className="BackgroundPanel1">
          <div className="ProfileBlock">
            <div>
              <div className="ProfileIconContainer">
                <UserProfileIcon
                  name="Hjsith"
                  colorNumber={1}
                  company={false}
                  size={150}
                />
              </div>
              <div className="NameButtonContainer">
                <p className="ProfileTitles Username">Hjsith</p>
                <a href="#Friends" className="ProfileFriendButton">
                  My Friends &gt;
                </a>
              </div>
            </div>
            <ProfileStatTable />
            <div className="PasswordButtonContainer">
              <a href="/UpdatePassword" className="ProfilePasswordButton">
                Change your password
              </a>
            </div>
          </div>
          <VerticalLine />
          <div className="AchievementBlock">
            <p className="ProfileTitles">Achievements!</p>
            <div className="UserAchievement">
              <AchievementBlock loop={16} />
            </div>
          </div>
        </div>
        <Popup message={this.state.snackBarMessage} />
      </div>
    );
  }
}

export default Profile;
