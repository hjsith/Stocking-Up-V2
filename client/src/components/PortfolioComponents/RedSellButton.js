import React from "react";
import "../../assets/css/PortfolioPage.scss";

class RedSellButton extends React.Component {
  handleSell() {
    console.log("Sold!!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="RedSellButton" onClick={this.handleSell}>
          Sell
        </button>
      </div>
    );
  }
}

export default RedSellButton;
