import React from "react";
import "../assets/css/UserProfileIcon.scss";

function makeNameShorter(name) {
  const splitName = name.split(" ");
  let shortenedName = "";
  if (splitName.length >= 2) {
    shortenedName = splitName[0][0] + splitName[1][0];
  } else {
    shortenedName = splitName[0].substring(0, 2);
  }
  return shortenedName;
}

class UserProfileIcon extends React.Component {
  render() {
    let shortenedName = makeNameShorter(this.props.name);
    return (
      <>
        <div className="UserProfileIcon" id={shortenedName}>
          {shortenedName}
        </div>
      </>
    );
  }

  componentDidMount() {
    let shortenedName = makeNameShorter(this.props.name);
    var hexArray = [
      "#a01edd",
      "#2EA4D7",
      "#29D062",
      "#D9932A",
      "#E1D245",
      "#DE3838",
    ];
    var randomColour = hexArray[Math.floor(Math.random() * hexArray.length)];
    document.getElementById(shortenedName).style.backgroundColor = randomColour;
  }
}

export default UserProfileIcon;
