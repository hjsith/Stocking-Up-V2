import React from "react";
import "../assets/css/UserProfileIcon.scss";

class UserProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

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

  hashNameintoIndex() {
    let count = 0;
    for (var i = 0; i < this.props.name.length; i++) {
      count += this.props.name.charCodeAt(i);
    }
    return count % 7;
  }

  render() {
    let shortenedName = this.makeObjectNameShorter(
      this.props.name,
      this.props.company
    );
    return (
      <div className="UserProfileIcon" ref={this.myRef}>
        <div className="IconText">{shortenedName}</div>
      </div>
    );
  }

  componentDidMount() {
    var hexArray = [
      "#a01edd",
      "#2EA4D7",
      "#29D062",
      "#D9932A",
      "#E1D245",
      "#DE3838",
      "#DD1EB3",
    ];
    this.myRef.current.style.backgroundColor =
      hexArray[this.hashNameintoIndex()];
    this.myRef.current.style.height = this.props.size + "px";
    this.myRef.current.style.width = this.props.size + "px";
    this.myRef.current.style.fontSize = this.props.size / 2.5 + "px";
  }
}

export default UserProfileIcon;
