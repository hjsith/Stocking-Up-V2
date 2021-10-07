import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";
import { Link } from "react-router-dom";

class HoldingsRowPanel extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
    };
  }

  //On page load fetch API calls to get listing and the current price from the Listing and Price database.
  componentDidMount() {
    fetch("/api/listing" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          //from Listing model using the company code obtaining the company name
          name: body.name,
        });
      });
    });

    fetch("/api/price" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          //from Price model using the company code obtaining the current price
          price: body.price,
        });
      });
    });
  }

  render() {
    return (
      <div className="HoldingsRowPanel">
        {/* table used to map out the information within each row seen via props retrieved from the front end (MyHoldings component) */}
        <table className="TableTitleFont2">
          <tr>
            <th>
              <UserProfileIcon
                name={this.props.companyCode}
                colorNumber={this.props.colourNumber}
                company={true}
                size={50}
              />
            </th>
            <th>{this.state.name}</th>
            <th>{this.props.priceBought}</th>
            <th>{this.state.price}</th>
            <th>{this.props.units}</th>
            <th>{this.props.total}</th>
            <th>
              <div>
                {/* link used to reroute investor the listing page on click passing through the companyCode */}
                <Link
                  to={{
                    pathname: "/QuoteManagement",
                    state: { listingID: this.props.companyCode },
                  }}
                >
                  <div className="GreenBuy">
                    {this.state.currentListingPrice} <span>Buy</span>
                  </div>
                </Link>
              </div>
            </th>
            <th>
              <div>
                {/* link used to reroute investor the listing page on click passing through the companyCode */}
                <Link
                  to={{
                    pathname: "/QuoteManagement",
                    state: { listingID: this.props.companyCode },
                  }}
                >
                  <div className="RedSell">
                    {this.state.currentListingPrice} <span>Sell</span>
                  </div>
                </Link>
              </div>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default HoldingsRowPanel;
