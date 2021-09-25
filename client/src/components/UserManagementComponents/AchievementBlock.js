import React from "react";
import "../../assets/css/Achievement.scss";
import Achievement from "./Achievement";

class AchievementBlock extends React.Component {
  generateAchievementBlock() {
    let array = [];
    for (let i = 0; i < this.props.loop; i++) {
      array.push(
        <Achievement
          achievementStatus={true}
          title="First Friend!"
          description="Together Forever :)"
        />
      );
    }
    return array;
  }

  render() {
    return <>{this.generateAchievementBlock()}</>;
  }
}

export default AchievementBlock;
