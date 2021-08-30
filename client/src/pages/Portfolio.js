import React from "react";
import "../assets/css/PortfolioPage.scss";
import HoldingsRowPanel from "../components/HoldingsRowPanel";
import OrderRowPanel from "../components/OrderRowPanel";
import WatchlistRowPannel from "../components/WatchlistRowPanel";
import PanelTitle from "../components/PanelTitle";
import PortfolioOverviewPanel from "../components/PortfolioOverviewPanel";
import UserProfileIcon from "../components/UserProfileIcon";
import WhiteLine from "../components/WhiteLine";
import NavBar from "../components/NavBar";

class Portfolio extends React.Component {
  render() {
    return (
      <div className="test">
        <NavBar />
        <div className="BackgroundPanel1">
          {" "}
          <table className="TableNormalNoFormat">
            <tr>
              <th width="2%">
                <UserProfileIcon name="Hjsith" />
              </th>
              <th width="75%">
                <th className="NormalPanelTitle">Hjisth</th>
              </th>
              <th width="20%">
                <div className="ButtonContainer">
                  <a href="/Leaderboard" className="GoldRankButton">
                    Current Rank: 152 (+10)
                  </a>
                </div>
              </th>
            </tr>
          </table>
          <PortfolioOverviewPanel />
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
          <div className="divorder">
            <OrderRowPanel />
            <OrderRowPanel />
            <OrderRowPanel />
            <OrderRowPanel />
            <OrderRowPanel />
          </div>
          <WhiteLine />
          <table className="TableWatchlistTitle">
            <tr>
              <th width="78%">
                <th className="NormalPanelTitle2">Watchlist</th>
              </th>
              <th th width="19%">
                <div className="ButtonContainer">
                  <a href="/Search" className="BlueWatchlistButton">
                    + Add Company
                  </a>
                </div>
              </th>
            </tr>
          </table>
          <table className="TableTitleFont">
            <tr>
              <th>Company Code</th>
              <th>Company Name</th>
              <th>Current Price</th>
              <th>% Change</th>
              <th>Industry</th>
              <th>Actions</th>
            </tr>
          </table>
          <div className="divwatchlist">
            <WatchlistRowPannel />
            <WatchlistRowPannel />
            <WatchlistRowPannel />
            <WatchlistRowPannel />
            <WatchlistRowPannel />
            <WatchlistRowPannel />
            <WatchlistRowPannel />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
