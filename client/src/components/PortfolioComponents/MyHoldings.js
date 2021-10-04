import React from "react";
import "../../assets/css/PortfolioPage.scss";
import PanelTitle from "./PanelTitle";
import HoldingsRowPanel from "./HoldingsRowPanel";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class MyHoldings extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      holdingArray: [],
      snackBarMessage: "",
      userName: "",
      unauth: false,
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
      fetch("/api/holdings" + "?investorID=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            holdingArray: body,
          });
        });
      });
      console.log(this.state.holdingArray);
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
        <PanelTitle title="My Holdings" />
        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Price Bought</th>
            <th>Current Price</th>
            <th>Quantity (units)</th>
            <th>Total ($)</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </table>
        <div className="divholding">
          {/* Takes the array stored in holdingArray and maps the data to the props */}
          {this.state.holdingArray.map((holding, index) => {
            return (
              <HoldingsRowPanel
                key={holding.OrderID}
                companyCode={holding.ListingID}
                priceBought={holding.ListingPrice}
                units={holding.QuantityOrder}
                total={holding.OrderTotal}
              />
            );
          })}
        </div>
        <br />
      </div>
    );
  }
}

export default MyHoldings;
