import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import PanelTitle from "./PanelTitle";
import OrderRowPanel from "./OrderRowPanel";

class RecentOrders extends React.Component {
  render() {
    return (
      <div>
        <PanelTitle title="Recent Orders" />
        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Price Bought</th>
            <th>Current Price</th>
            <th>Quantity (units)</th>
            <th>Total ($)</th>
            <th>Status</th>
          </tr>
        </table>
        <div className="divorder">
          <OrderRowPanel />
          <OrderRowPanel />
          <OrderRowPanel />
          <OrderRowPanel />
          <OrderRowPanel />
        </div>
      </div>
    );
  }
}

export default RecentOrders;
