import React from "react";
import "../assets/css/PortfolioPage.scss";
import UserProfileIcon from "./UserProfileIcon";
import WhiteLine from "./WhiteLine";

class PortfolioOverviewPanel extends React.Component {
  render() {
    return <div className="PortfolioOverviewPanel"> 
          <table className>
            <tr>
              <th className = "PortfolioOverviewTitle">Portfolio Value</th>
            </tr>
            <tr>
              <th className ="PortfolioOverviewValue">$10,978</th>
            </tr>
            <tr>
              <th>(+978)</th>
            </tr>
            <tr>
              <th>Today 20 August 2021</th>
            </tr>
            </table>
            <WhiteLine />
            <table className>
            <tr>
              <th>Account Balance</th>
              <th>$9,022.00</th>
            </tr>
          </table>
    </div>;
  }
}

export default PortfolioOverviewPanel;