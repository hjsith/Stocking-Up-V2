import React from "react";
import "../../assets/css/PortfolioPage.scss";
import OrderRowPanel from "./OrderRowPanel";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class RecentOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [],
      userName: "",
      unauth: false,
    };
  }

  static contextType = UserContext;

  fetchUser() {
    fetch("/api/investor?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) =>
          this.setState({
            userName: body.InvestorFName + " " + body.InvestorLName,
          })
        );
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  componentDidMount() {
    this.fetchUser();

    let investorID = this.context.user.id;
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

  render() {
    if (this.state.unauth || this.context.user.name === "") {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }
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
      });
      this.props.updateSnackbar(
        "Please wait 1 minute for your order to be cancelled"
      );
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
      });
      this.props.updateSnackbar("Your order has been confirmed");
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
            <th width="19%">
              <div className="ButtonContainer">
                <a href="/AllOrders" className="BlueWatchlistButton">
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
      </div>
    );
  }
}

export default RecentOrders;
