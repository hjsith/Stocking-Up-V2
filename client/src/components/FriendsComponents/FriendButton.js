import React from "react";
import whiteplus from "../../assets/images/whiteplus.svg";
import circle from "../../assets/images/pending.svg";
import "../../assets/css/PortfolioPage.scss";

class FriendButton extends React.Component {
  render() {
    let isPending = this.props.title == "Pending Requests";
    let image = isPending ? circle : whiteplus;

    return (
      <div className="ButtonContainer">
        <button className="Button">
          <img src={image} />
          &nbsp; {this.props.title}
        </button>
      </div>
    );
  }
}

export default FriendButton;
