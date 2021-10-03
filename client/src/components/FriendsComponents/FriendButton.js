import React from "react";
import whiteplus from "../../assets/images/whiteplus.svg";
import circle from "../../assets/images/pending.svg";

class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonValidator = this.buttonValidator.bind(this);
    this.imageResolver = this.imageResolver.bind(this);
    this.buttonEnabler = this.buttonEnabler.bind(this);
  }

  buttonValidator() {
    let results = [false, false, false];
    if (this.props.title == "Pending Requests") results = [false, false, true];
    else if (this.props.title == "Add Friends?") results = [false, true, false];
    else results = [true, false, false];
    this.props.handler(results);
  }

  buttonEnabler() {
    if (this.props.panelNumber == 0) {
      if (this.props.title == "Pending Requests") return false;
      else if (this.props.title == "Add Friends?") return false;
    } else if (this.props.panelNumber == 1) {
      if (this.props.title == "Pending Requests") return false;
      else if (this.props.title == "Add Friends?") return true;
    } else if (this.props.panelNumber == 2) {
      if (this.props.title == "Pending Requests") return true;
      else if (this.props.title == "Add Friends?") return false;
    }
  }

  imageResolver() {
    let isPending = this.props.title == "Pending Requests";
    let image = isPending ? circle : whiteplus;
    return image;
  }

  render() {
    let image = this.imageResolver();

    return (
      <div className="ButtonContainer">
        <button
          className={this.buttonEnabler() ? "ButtonDisabled" : "Button"}
          disabled={this.buttonEnabler()}
          onClick={this.buttonValidator}
        >
          <img src={image} />
          &nbsp; {this.props.title}
        </button>
      </div>
    );
  }
}

export default FriendButton;
