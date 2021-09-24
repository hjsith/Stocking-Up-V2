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
              <GreenBuyButton />
            </th>
            <th>
              <RedSellButton />
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default HoldingsRowPanel;
