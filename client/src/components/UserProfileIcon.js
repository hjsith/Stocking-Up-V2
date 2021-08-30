import React from "react";
import "../assets/css/UserProfileIcon.scss";

class UserProfileIcon extends React.Component {
  makeObjectNameShorter(objectName, company) {
    const splitName = objectName.split(" ");
    let shortenedName = "";
    if (company) {
      return splitName[0];
    } else {
      if (splitName.length >= 2) {
        shortenedName = splitName[0][0] + splitName[1][0];
      } else {
        shortenedName = splitName[0].substring(0, 2);
      }
    }
    return shortenedName;
  }

  render() {
    let shortenedName = this.makeObjectNameShorter(
      this.props.name,
      this.props.company
    );
    return (
      <div className="UserProfileIcon" id={shortenedName}>
        <div className="IconText">{shortenedName}</div>
      </div>
    );
  }

  componentDidMount() {
    let shortenedName = this.makeObjectNameShorter(
      this.props.name,
      this.props.company
    );
    var hexArray = [
      "#a01edd",
      "#2EA4D7",
      "#29D062",
      "#D9932A",
      "#E1D245",
      "#DE3838",
    ];
    document.getElementById(shortenedName).style.backgroundColor =
      hexArray[this.props.colorNumber];
    document.getElementById(shortenedName).style.height =
      this.props.size + "px";
    document.getElementById(shortenedName).style.width = this.props.size + "px";
    document.getElementById(shortenedName).style.fontSize =
      this.props.size / 2.5 + "px";
  }
}

export default UserProfileIcon;
