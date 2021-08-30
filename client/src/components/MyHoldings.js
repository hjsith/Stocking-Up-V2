import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import PanelTitle from "./PanelTitle";
import HoldingsRowPanel from "./HoldingsRowPanel";

class MyHoldings extends React.Component {
  render() {
    return (
      <div>
        <PanelTitle title="My Holdings" />
        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Price Bought</th>
            <th>Current Price</th>
            <th>Quantity (units)</th>
            <th>Total ($)</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </table>
        <div className="divholding">
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
        </div>
      </div>
    );
  }
}

export default MyHoldings;
