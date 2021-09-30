import React from "react";
import "../assets/css/Snackbar.scss";
import Popup from "./Popup";

class Snackbar extends React.Component {
  render() {
    return (
      <div className="snackbarContainer">
        <Popup message="hello" index={0} />
        <Popup message="how are you?" index={1} />
      </div>
    );
  }
}

export default Snackbar;
