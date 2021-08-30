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
              <table className="ProfileStatTable">
                <tr>
                  <td>
                    <ProjectStat title="Rank" value="#20" />
                  </td>
                  <td>
                    <ProjectStat title="Net Worth" value="$130 Billion" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ProjectStat title="Difficulty" value="Easy" />{" "}
                  </td>
                  <td>
                    <ProjectStat title="Title" value="Veteran" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ProjectStat title="Friends" value="243" />{" "}
                  </td>
                  <td>
                    <ProjectStat title="Posts" value="51" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ProjectStat title="Date Joined" value="01/01/2021" />{" "}
                  </td>
                  <td>
                    <ProjectStat
                      title="Days till next simulator wipe"
                      value="122 Days"
                    />
                  </td>
                </tr>
              </table>
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
              <AchievementBlock loop={16} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
