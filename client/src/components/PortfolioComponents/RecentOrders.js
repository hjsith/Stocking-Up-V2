import React from "react";
import "../../assets/css/PortfolioPage.scss";
import OrderRowPanel from "./OrderRowPanel";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class RecentOrders extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [],
      userName: "",
      unauth: false,
      disable: [],
    };
  }

  //Fetching and obtaining investor which is signed in to display information
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

  //On page load fetch API calls to get all orders made by the investor from the investor ID from the Order database and puts it within the allOrdersArray which is mapped to the AllOrderRowPanel component.
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
          let temp = [];
          temp = this.state.disable;
          for (let i = 0; i < body.length; i++) {
            console.log(body[i].ExecutionTime < new Date());
            if (Date.parse(body[i].ExecutionTime) < new Date()) {
              temp.push(true);
            } else {
              temp.push(false);
            }
          }
          this.setState({
            disable: temp,
          });
        });
      });

      console.log(this.state.orderArray);
    }, 500);
  }

  //This render checks to see whether an investor is logged into the application to allow access to this URL, if not it redirects to the Sign In page
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

  //Cancel functionality for orders which includes removing the order from the OrderArray and this is put into the cancelOrder API route
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
      this.props.updateSnackbar("Your order has been cancelled");
    });
  };

  //Confirm functionality for orders which executes the order immediately on click - this executes within 1 minute in the order queue and this is put into the confirmedOrders API route
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
      let temp = this.state.disable;
      temp[index] = true;
      this.setState({
        disable: temp,
      });
      this.props.updateSnackbar("Your order has been confirmed");
    });
  };

  render() {
    return (
      <div>
        <table className="TableWatchlistTitle">
          <tr>
            <th className="RecentOrdersWidth">
              <th className="NormalPanelTitle2">Recent Orders</th>
            </th>
            <th className="RecentOrdersWidth1">
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
          {/* Takes the array stored in orderArray and maps the data to the props */}
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
                disable={this.state.disable[index]}
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
