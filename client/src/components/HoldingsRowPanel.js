import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenCompletedButton from "./GreenCompletedButton"
import UserProfileIcon from "./UserProfileIcon";

class HoldingsRowPanel extends React.Component {
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
              <a className="GreenBuyButton">
                Buy
              </a>
              </th>
              <th>
              <div className="ButtonContainer"/>
              <a className="RedSellButton">
                Sell
              </a>
              </th>
            </tr>
          </table>
          
    </div>;
  }
}

export default HoldingsRowPanel;
