import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WhiteLine from "../WhiteLine";

class PortfolioOverviewPanel extends React.Component {
  state = {
    date: new Date(),
    time: new Date(),
  };

  currentDate() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  currentTime() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  render() {
    return (
      <div className="PortfolioOverviewPanel">
        <table className>
          <tr>
            <th className="PortfolioOverviewTitle">Portfolio Value</th>
          </tr>
          <tr>
            <th className="PortfolioOverviewValue">$10,978</th>
          </tr>
          <tr>
            <th className="PortfolioPriceIncrease">(+ $978.00 )</th>
          </tr>
          <tr>
            <th className="PortfolioDateFont">
              {" "}
              Today: {this.state.date.toLocaleDateString()}{" "}
              {this.state.date.toLocaleTimeString()}
            </th>
          </tr>
        </table>
        <WhiteLine />
        <table className>
          <tr>
            <th className="PortfolioBalanceFont">Account Balance:</th>
            <th className="PortfolioBalanceFont">$9,022.00</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default PortfolioOverviewPanel;
