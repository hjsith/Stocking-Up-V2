import React from "react";
import "../assets/css/PortfolioPage.scss";
import PortfolioOverviewPanel from "../components/PortfolioComponents/PortfolioOverviewPanel";
import UserProfileIcon from "../components/UserProfileIcon";
import WhiteLine from "../components/WhiteLine";
import NavBar from "../components/NavBar";
import MyHoldings from "../components/PortfolioComponents/MyHoldings";
import RecentOrders from "../components/PortfolioComponents/RecentOrders";
import Watchlist from "../components/PortfolioComponents/Watchlist";
import Snackbar from "../components/Snackbar";
import OrderRowPanel from "../components/PortfolioComponents/OrderRowPanel";
import AllOrderRowPanel from "../components/PortfolioComponents/AllOrderRowPanel";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrdersArray: [],
    };
  }

  componentDidMount() {
    let investorID = "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73";
    setInterval(() => {
      fetch("/api/orders/all" + "?investorID=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            allOrdersArray: body,
          });
        });
      });
      console.log(this.state.allOrdersArray);
    }, 500);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="BackgroundPanel3">
          <table className="TableWatchlistTitle">
            <tr>
              <th width="90%">
                <th className="NormalPanelTitle2">All Orders</th>
              </th>
              <th width="18%">
                <div className="ButtonContainer">
                  <a href="/Portfolio" className="BlueWatchlistButton">
                    Back to Portfolio
                  </a>
                </div>
              </th>
            </tr>
          </table>
          <table className="TableTitleFontAllOrder">
            <tr>
              <th>Company Code</th>
              <th>Company Name</th>
              <th>Type of Order</th>
              <th>Status</th>
              <th>Listing Price</th>
              <th>Quantity (units) </th>
              <th>Total ($)</th>
              <th>Order Time</th>
              <th>Executed Time</th>
            </tr>
          </table>
          <div className="divallorder">
            {this.state.allOrdersArray.map((allOrder, index) => {
              return (
                <AllOrderRowPanel
                  key={allOrder.OrderID}
                  colourNumber={1}
                  companyCode={allOrder.ListingID}
                  typeofOrder={allOrder.TypeOfOrder}
                  status={allOrder.Status}
                  listingPrice={allOrder.ListingPrice}
                  quantityOrder={allOrder.QuantityOrder}
                  orderTotal={allOrder.OrderTotal}
                  orderTime={allOrder.OrderTime}
                  executedTime={allOrder.ExecutionTime}
                  priceBought={allOrder.ListingPrice}
                  units={allOrder.QuantityOrder}
                  total={allOrder.OrderTotal}
                  orderID={allOrder.OrderID}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
