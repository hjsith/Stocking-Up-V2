import React from "react";
import "../assets/css/PortfolioPage.scss";
import OrderRowPanel from "./OrderRowPanel";
import PanelTitle from "./PanelTitle";
import UserProfileIcon from "./UserProfileIcon";
import WhiteLine from "./WhiteLine";

class PortfolioPage extends React.Component {
  render() {
    return (
      <>
        <div className="BackgroundPanel1">
          {" "}
          <PanelTitle title="Hjsith" />{" "}
          <UserProfileIcon name="Hjsith" />
          <WhiteLine />
          <PanelTitle title="My Holdings" />
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

export default PortfolioPage;
