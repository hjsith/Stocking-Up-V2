import React from "react";
import "../../assets/css/PortfolioPage.scss";
import Popup from "../../components/Popup";
import OrderRowPanel from "./OrderRowPanel";

class RecentOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [],
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    let investorID = "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73";
    setInterval(() => {
      fetch("/api/orders/pending" + "?investorID=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            orderArray: body,
          });
        });
      });
      console.log(this.state.orderArray);
    }, 500);
  }

  cancelEvent = (index, ID) => {
    fetch("/api/cancelOrders", {
      method: "PUT",
      body: JSON.stringify({
        orderID: ID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const copyOrderArray = Object.assign([], this.state.orderArray);
      copyOrderArray.splice(index, 1);
      this.setState({
        orderArray: copyOrderArray,
        snackBarMessage: "Please wait 1 minute for your order to be cancelled",
        //Ask James on how to do it when you delete multiple things
      });
    });
  };

  confirmEvent = (index, ID) => {
    fetch("/api/confirmedOrders", {
      method: "PUT",
      body: JSON.stringify({
        orderID: ID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const copyOrderArray = Object.assign([], this.state.orderArray);
      this.setState({
        orderArray: copyOrderArray,
        snackBarMessage: "Your order has been confirmed",
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
              <th className="NormalPanelTitle2">Recent Orders</th>
            </th>
            <th th width="19%">
              <div className="ButtonContainer">
                <a href="/CompanySearch" className="BlueWatchlistButton">
                  All My Orders
                </a>
              </div>
            </th>
          </tr>
        </table>

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
          {this.state.orderArray.map((order, index) => {
            return (
              <OrderRowPanel
                key={order.OrderID}
                colourNumber={1}
                companyCode={order.ListingID}
                priceBought={order.ListingPrice}
                units={order.QuantityOrder}
                total={order.OrderTotal}
                cancel={this.cancelEvent.bind(this, index)}
                confirm={this.confirmEvent.bind(this, index)}
                orderID={order.OrderID}
              />
            );
          })}
        </div>
        <div>
          <Popup message={this.state.snackBarMessage} />
        </div>
      </div>
    );
  }
}

export default RecentOrders;
