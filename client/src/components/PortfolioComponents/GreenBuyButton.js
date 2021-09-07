import React from "react";
import "../../assets/css/PortfolioPage.scss";

class GreenBuyButton extends React.Component {
  handleBuy() {
    console.log("Bought!!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="GreenBuyButton" onClick={this.handleBuy}>
          Buy
        </button>
      </div>
    );
  }
}

export default GreenBuyButton;
