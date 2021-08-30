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
import MyHoldings from "../components/MyHoldings";
import RecentOrders from "../components/RecentOrders";
import Watchlist from "../components/Watchlist";

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
          <MyHoldings />
        </div>
        <div className="BackgroundPanel2">
          {" "}
          <RecentOrders />
          <WhiteLine />
          <Watchlist />
        </div>
      </div>
    );
  }
}

export default Portfolio;
