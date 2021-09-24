import React from "react";
import "../../assets/css/PortfolioPage.scss";
import PanelTitle from "./PanelTitle";
import HoldingsRowPanel from "./HoldingsRowPanel";

class MyHoldings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holdingArray: [],
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    let investorID = "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73";
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

  handleBuy() {
    console.log("Bought!!");
  }

  handleSell() {
    console.log("Sold!!");
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
          {this.state.holdingArray.map((holding, index) => {
            return (
              <HoldingsRowPanel
                key={holding.OrderID}
                colourNumber={2}
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
