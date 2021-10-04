import React from "react";
import "../assets/css/PortfolioPage.scss";
import NavBar from "../components/NavBar";
import AllOrderRowPanel from "../components/PortfolioComponents/AllOrderRowPanel";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class Portfolio extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      allOrdersArray: [],
      userName: "",
      unauth: false,
    };
  }

  //Fetching and obtaining investor which is signed in to display information
  static contextType = UserContext;

  fetchUser() {
    this.fetchUser();

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
    let investorID = this.context.user.id;
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

  render() {
    return (
      <div>
        <NavBar />
        <div className="BackgroundPanel3">
          <table className="TableWatchlistTitle">
            <tr>
              <th>
                <th className="NormalPanelTitle2">All Orders</th>
              </th>
              <th className="AllOrdersHeadingwidth">
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
              <th>Order and Executed Time</th>
            </tr>
          </table>
          <div className="divallorder">
            {/* Takes the array stored in allOrdersArray and maps the data to the props */}
            {this.state.allOrdersArray.map((allOrder, index) => {
              return (
                <AllOrderRowPanel
                  key={allOrder.OrderID}
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
          <div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
