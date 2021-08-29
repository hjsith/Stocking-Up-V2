import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/Profile.scss";
import AchievementBlock from "../components/AchievementBlock";
import UserProfileIcon from "../components/UserProfileIcon";
import ProjectStat from "../components/ProfileStat";

class Profile extends React.Component {
  render() {
    return (
      <div className="Container">
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
              <div className="test">
                <p className="Title Username">Hjsith</p>
                <a href="#Friends" className="ProfileFriendButton">
                  My Friends &gt;
                </a>
              </div>
            </div>
            <div className="ProfileStat">
              <ProjectStat title="Net Worth" value="$130 Billion" />
              <ProjectStat title="Difficulty" value="Easy" />
              <ProjectStat title="Title" value="Veteran" />
              <ProjectStat title="Friends" value="243" />
              <ProjectStat title="Posts" value="51" />
              <ProjectStat title="Date Joined" value="01/01/2021" />
              <ProjectStat
                title="Days till next simulator wipe"
                value="122 Days"
              />
            </div>
            <div className="PasswordButtonContainer">
              <a href="/UpdatePassword" className="ProfilePasswordButton">
                Change your password
              </a>
            </div>
          </div>
          <div className="VerticalLineBlock">
            <div className="VerticalLine"></div>
          </div>
          <div className="AchievementBlock">
            <p className="Title">Achievements!</p>
            <div className="UserAchievement">
              <AchievementBlock loop={10} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
