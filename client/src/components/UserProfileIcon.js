import React from "react";
import "../assets/css/UserProfileIcon.scss";

class UserProfileIcon extends React.Component {
  makeObjectNameShorter(objectName) {
    const splitName = objectName.split(" ");
    let shortenedName = "";
    if (splitName.length >= 2) {
      shortenedName = splitName[0][0] + splitName[1][0];
    } else {
      shortenedName = splitName[0].substring(0, 2);
    }
    return shortenedName;
  }

  render() {
    let shortenedName = this.makeObjectNameShorter(this.props.name);
    return (
      <>
        <div className="UserProfileIcon" id={shortenedName}>
          {shortenedName}
        </div>
      </>
    );
  }

  componentDidMount() {
    let shortenedName = this.makeObjectNameShorter(this.props.name);
    var hexArray = [
      "#a01edd",
      "#2EA4D7",
      "#29D062",
      "#D9932A",
      "#E1D245",
      "#DE3838",
    ];
    document.getElementById(shortenedName).style.backgroundColor =
      hexArray[this.props.number];
  }
}

export default UserProfileIcon;
