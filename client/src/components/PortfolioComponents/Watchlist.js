import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WatchlistRowPannel from "./WatchlistRowPanel";
import Popup from "../../components/Popup";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlistArray: [],
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    let investorID = "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73";
    setInterval(() => {
      fetch("/api/watchlist" + "?investorID=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            watchlistArray: body,
          });
        });
      });
      console.log(this.state.watchlistArray);
    }, 500);
  }

  cancelEvent = (index, watchID) => {
    fetch("/api/watchlistremoved", {
      method: "DELETE",
      body: JSON.stringify({
        // investorID: investID,
        // listingID: listID,
        ID: watchID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const copyWatchlistArray = Object.assign([], this.state.watchlistArray);
      copyWatchlistArray.splice(index, 1);
      this.setState({
        watchlistArray: copyWatchlistArray,
        snackBarMessage: "Your watchlist item has been successfully deleted",
        //Ask James on how to do it when you delete multiple things
      });
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
        <table className="TableTitleFont10">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>Year Low Price</th>
            <th>Year High Price</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </table>
        <div className="divwatchlist">
          {this.state.watchlistArray.map((watchlist, index) => {
            return (
              <WatchlistRowPannel
                key={watchlist.watchlistID}
                colourNumber={3}
                companyCode={watchlist.ListingID}
                listingID={watchlist.ListingID}
                investorID={watchlist.InvestorID}
                ID={watchlist.id}
                // percentChange={watchlist.percentChange}
                cancel={this.cancelEvent.bind(this, index)}
              />
            );
          })}
        </div>
        <br />
        <div>{/* <Popup message={this.state.snackBarMessage} /> */}</div>
      </div>
    );
  }
}

export default Watchlist;
