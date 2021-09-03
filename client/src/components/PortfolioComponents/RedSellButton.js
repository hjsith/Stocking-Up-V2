import React from "react";
import "../../assets/css/Achievement.scss";

class RedSellButton extends React.Component {
  handelSell() {
    console.log("Sold!!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="RedSellButton" onClick={this.handelSell}>
          Sell
        </button>
      </div>
    );
  }
}

export default RedSellButton;
