import React from "react";
import "../assets/css/Popup.scss";

class Popup extends React.Component {
  hideElement() {
    document.getElementById("Popup").style.display = "none";
  }
  componentDidUpdate() {
    if (this.props.message != "") {
      setTimeout(this.hideElement, 3000);
    }
  }

  render() {
    if (this.props.message == "") {
      return <></>;
    }
    return <div id="Popup">{this.props.message}</div>;
  }
}

export default Popup;
