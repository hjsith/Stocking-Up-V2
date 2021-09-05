import React from "react";
import "../assets/css/PortfolioPage.scss";
import PortfolioOverviewPanel from "../components/PortfolioComponents/PortfolioOverviewPanel";
import UserProfileIcon from "../components/UserProfileIcon";
import WhiteLine from "../components/WhiteLine";
import NavBar from "../components/NavBar";
import MyHoldings from "../components/PortfolioComponents/MyHoldings";
import RecentOrders from "../components/PortfolioComponents/RecentOrders";
import Watchlist from "../components/PortfolioComponents/Watchlist";

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
                <UserProfileIcon
                  name="Hjsith"
                  colorNumber={1}
                  company={false}
                  size={60}
                />
              </th>
              <th width="75%">
                <th className="NormalPanelTitle">Hjsith</th>
              </th>
              <th width="20%">
                <div className="ButtonContainer">
                  <a href="/Leaderboard" className="GoldRankButton">
                    Current Rank: 152
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
