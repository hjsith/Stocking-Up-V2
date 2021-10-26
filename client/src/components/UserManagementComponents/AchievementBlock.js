import React from "react";
import "../../assets/css/Achievement.scss";
import Achievement from "./Achievement";
import { UserContext } from "../UserContext";

class AchievementBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };
  }

  static contextType = UserContext;

  //Get the currently signed in user's achievements
  fetchAchievements() {
    fetch("/api/ObtainedAchievements?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => this.setState({ achievements: body }));
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  componentDidMount() {
    this.fetchAchievements();
  }

  render() {
    return (
      <>
        {this.state.achievements.map((element, index) => (
          <Achievement
            achievementStatus={element.AchievementStatus}
            title={element.AchievementTitle}
            description={element.AchievementDescription}
          />
        ))}
      </>
    );
  }
}

export default AchievementBlock;
