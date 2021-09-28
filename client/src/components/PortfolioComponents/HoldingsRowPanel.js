import React from "react";
import "../../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import UserProfileIcon from "../UserProfileIcon";

class HoldingsRowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      NumberHolder: 0,
    };
  }

  componentDidMount() {
    fetch("/api/listing" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
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

  generateRandomNumber() {
    var RandomNumber = Math.floor(Math.random() * 6) + 1;

    this.setState({
      NumberHolder: RandomNumber,
    });
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
