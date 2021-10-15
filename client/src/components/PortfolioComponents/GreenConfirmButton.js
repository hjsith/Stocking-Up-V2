import React from "react";
import "../../assets/css/PortfolioPage.scss";

class GreenBuyButton extends React.Component {
  handleConfirmOrder() {
    console.log("Confirm!!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button
          className="GreenConfirmButton"
          onClick={this.handleConfirmOrder}
        >
          Buy
        </button>
      </div>
    );
  }
}

export default GreenBuyButton;
