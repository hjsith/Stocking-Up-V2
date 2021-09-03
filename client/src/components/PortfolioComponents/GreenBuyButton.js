import React from "react";
import "../../assets/css/Achievement.scss";

class GreenBuyButton extends React.Component {
  handelBuy() {
    console.log("Bought!!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="GreenBuyButton" onClick={this.handelBuy}>
          Buy
        </button>
      </div>
    );
  }
}

export default GreenBuyButton;
