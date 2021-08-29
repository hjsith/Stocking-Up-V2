import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenCompletedButton from "./GreenCompletedButton"
import UserProfileIcon from "./UserProfileIcon";

class HoldingsRowPanel extends React.Component {

  handelSell() {
    console.log("Sold!")
  } 

  handelBuy() {
    console.log("Bought!")
  } 

  render() {
    return <div className="HoldingsRowPanel"> 
     <table className="TableTitleFont2">
            <tr>
              <th><UserProfileIcon name="A2M" /> </th>
              
              <th>A2 Milk</th>
              <th>$6.52</th>
              <th>$7.02</th>
              <th>150</th>
              <th>$975</th>
              <th>
              <div className="ButtonContainer"/>
              <button className="GreenBuyButton" onClick={this.handelBuy}>
                Buy
              </button>
              </th>
              <th>
              <div className="ButtonContainer"/>
              <button className="RedSellButton" onClick={this.handelSell}>
                Sell
              </button>
              </th>
            </tr>
          </table>
          
    </div>;
  }
}

export default HoldingsRowPanel;
