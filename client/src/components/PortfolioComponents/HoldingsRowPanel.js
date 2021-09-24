import React from "react";
import "../../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import UserProfileIcon from "../UserProfileIcon";
import {
  getCurrentPriceForListing,
  getCompanyName,
} from "../../connection/Listing";

class HoldingsRowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
    };
  }

  componentDidMount() {
    getCompanyName(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          name: body.name,
        });
      });
    });

    getCurrentPriceForListing(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          price: body.price,
        });
      });
    });
  }

  handleBuy() {
    console.log("Bought!!");
  }

  handleSell() {
    console.log("Sold!!");
  }

  render() {
    return (
      <div className="HoldingsRowPanel">
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
              {/* <GreenBuyButton /> */}
              <div className="ButtonContainer">
                <button className="GreenBuyButton" onClick={this.handleBuy}>
                  Buy
                </button>
              </div>
            </th>
            <th>
              {/* <RedSellButton /> */}
              <div className="ButtonContainer">
                <button className="RedSellButton" onClick={this.handleSell}>
                  Sell
                </button>
              </div>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

// a href="/Leaderboard"

export default HoldingsRowPanel;
