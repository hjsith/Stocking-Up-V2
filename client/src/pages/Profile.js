import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/Profile.scss";
import AchievementBlock from "../components/UserManagementComponents/AchievementBlock";
import UserProfileIcon from "../components/UserProfileIcon";
import ProfileStatTable from "../components/UserManagementComponents/ProfileStatTable";
import Popup from "../components/Popup";
import VerticalLine from "../components/UserManagementComponents/VerticalLine";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarMessage: "",
      userRank: "",
      userNetWorth: "",
      userDifficulty: "",
      userTitle: "",
      userFriendCount: "0",
      userPostCount: "0",
      userDatejoined: "",
      SimulationEndDate: "0",
      userName: "",
      unauth: false,
    };
  }

  static contextType = UserContext;

  //Get information about currently logged in user
  fetchUser() {
    fetch("/api/investor?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) =>
          this.setState({
            userRank: body.InvestorRanking,
            userNetWorth: "" + body.NetWorth,
            userDifficulty: body.InvestorDifficulty,
            userTitle: body.Title,
            userDatejoined: body.DateJoined,
            userName: body.InvestorFName + " " + body.InvestorLName,
          })
        );
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  //Get the number of friends the currently signed in user has
  fetchFriendCount() {
    this.setState({ userFriendCount: 0 });
    //   fetch("/api/investor", {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       userID: "BADUSERID",
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }
  }

  //Get the number of comments the currently signed in user has made
  fetchPostCount() {
    this.setState({ userPostCount: 0 });
    //   fetch("/api/investor", {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       userID: "BADUSERID",
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }
  }

  //Get the currently signed in user's achievements
  fetchAchievements() {
    //   fetch("/api/investor", {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       userID: "BADUSERID",
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        snackBarMessage: this.props.location.state.snackBarMessage,
      });
    }
    this.fetchUser();
    this.fetchFriendCount();
    this.fetchPostCount();
    this.fetchAchievements();
  }

  render() {
    //Redirect if the user is not logged in
    if (this.state.unauth || this.context.user.name === "") {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }

    return (
      <div className="ProfileContainer">
        <NavBar />
        <div className="BackgroundPanel1">
          <div className="ProfileBlock">
            <div>
              <div className="ProfileIconContainer">
                <UserProfileIcon
                  name={this.state.userName}
                  colorNumber={1}
                  company={false}
                  size={150}
                />
              </div>
              <div className="NameButtonContainer">
                <p className="ProfileTitles Username">{this.state.userName}</p>
                <a href="#Friends" className="ProfileFriendButton">
                  My Friends &gt;
                </a>
              </div>
            </div>
            <ProfileStatTable
              rank={this.state.userRank}
              netWorth={this.state.userNetWorth}
              userDifficulty={this.state.userDifficulty}
              title={this.state.userTitle}
              dateJoined={this.state.userDatejoined}
              friendCount={this.state.userFriendCount}
              postCount={this.state.userPostCount}
              simualationDate={this.state.SimulationEndDate}
            />
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
