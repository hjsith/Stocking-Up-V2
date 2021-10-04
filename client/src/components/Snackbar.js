import React from "react";
import "../assets/css/Snackbar.scss";
import Popup from "./Popup";

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="snackbarContainer">
        {this.props.messages.map((message, index) => {
          return <Popup key={index} index={index} message={message} />;
        })}
      </div>
    );
  }
}

export default Snackbar;
