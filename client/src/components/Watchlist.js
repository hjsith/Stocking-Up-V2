import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import PanelTitle from "./PanelTitle";
import WatchlistRowPannel from "./WatchlistRowPanel";

class Watchlist extends React.Component {
  render() {
    return (
      <div>
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
    );
  }
}

export default Watchlist;
