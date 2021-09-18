import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WatchlistRowPannel from "./WatchlistRowPanel";
import Popup from "../../components/Popup";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlistArray: [
        {
          colourNumber: 1,
          companyCode: "A2M",
          companyName: "A2 Milk",
          currentPrice: "$7.02",
          percentChange: "0.2%",
          industry: "Consumer Staples",
        },
        {
          colourNumber: 4,
          companyCode: "CBA",
          companyName: "Commonwealth Bank",
          currentPrice: "$7.02",
          percentChange: "0.2%",
          industry: "Consumer Staples",
        },
        {
          colourNumber: 2,
          companyCode: "WIS",
          companyName: "Wisetech Global",
          currentPrice: "$7.02",
          percentChange: "0.2%",
          industry: "Consumer Staples",
        },
        {
          colourNumber: 3,
          companyCode: "MQG",
          companyName: "Macquarie Group",
          currentPrice: "$7.02",
          percentChange: "0.2%",
          industry: "Consumer Staples",
        },
        {
          colourNumber: 5,
          companyCode: "BRK",
          companyName: "Brickworks",
          currentPrice: "$7.02",
          percentChange: "0.2%",
          industry: "Consumer Staples",
        },
      ],
      snackBarMessage: "",
    };
  }

  cancelEvent = (index) => {
    const copyWatchlistArray = Object.assign([], this.state.watchlistArray);
    copyWatchlistArray.splice(index, 1);
    this.setState({
      watchlistArray: copyWatchlistArray,
      snackBarMessage: "Watchlist item has been successfully deleted!",
      //Ask James on how to do it when you delete multiple things
    });
  };

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
                <a href="/CompanySearch" className="BlueWatchlistButton">
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
          {this.state.watchlistArray.map((watchlist, index) => {
            return (
              <WatchlistRowPannel
                key={watchlist.companyCode}
                colourNumber={watchlist.colourNumber}
                companyCode={watchlist.companyCode}
                companyName={watchlist.companyName}
                currentPrice={watchlist.currentPrice}
                percentChange={watchlist.percentChange}
                industry={watchlist.industry}
                cancel={this.cancelEvent.bind(this, index)}
              />
            );
          })}
        </div>
        <br />
        <div>
          <Popup message={this.state.snackBarMessage} />
        </div>
      </div>
    );
  }
}

export default Watchlist;
