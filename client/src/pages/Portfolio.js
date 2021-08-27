import React from "react";
import "../assets/css/PortfolioPage.scss";
import HoldingsRowPanel from "../components/HoldingsRowPanel";
import OrderRowPanel from "../components/OrderRowPanel";
import PanelTitle from "../components/PanelTitle";
import UserProfileIcon from "../components/UserProfileIcon";
import WhiteLine from "../components/WhiteLine";
import NavBar from "../components/NavBar";

class Portfolio extends React.Component {
  render() {
    return (
      <>
      <NavBar />
        <div className="BackgroundPanel1">
          {" "}
          <PanelTitle title="Hjsith" />{" "}
          <UserProfileIcon name="Hjsith" />
          <WhiteLine />
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
            </tr>
          </table>
          <HoldingsRowPanel />
          <HoldingsRowPanel />
          <HoldingsRowPanel />
        </div>
        <div className="BackgroundPanel2">
          {" "}
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
          <OrderRowPanel />
          <OrderRowPanel />
          <OrderRowPanel />
          <OrderRowPanel />
          <WhiteLine />
        </div>
      </>
    );
  }
}

export default Portfolio;
