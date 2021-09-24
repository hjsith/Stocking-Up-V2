import React from "react";
import "../../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import UserProfileIcon from "../UserProfileIcon";
import {
  getCurrentPriceForListing,
  getCompanyName,
  getCompanyIndustry,
  getCompanyHighPrice,
  getCompanyLowPrice,
} from "../../connection/Listing";

class WatchlistRowPannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      highPrice: 0,
      lowPrice: 0,
      industry: "",
    };
  }

  componentDidMount() {
    getCompanyIndustry(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          industry: body.name,
        });
      });
    });

    getCompanyName(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          name: body.name,
        });
      });
    });

    getCompanyHighPrice(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          highPrice: body.highPrice,
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

    getCompanyLowPrice(this.props.companyCode).then((res) => {
      res.json().then((body) => {
        this.setState({
          lowPrice: body.lowPrice,
        });
      });
    });
  }

  render() {
    return (
      <div className="WatchlistRowPannel">
        <table className="TableTitleFont4">
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
            <th>{this.state.price}</th>
            <th>{this.state.lowPrice}</th>
            <th>{this.state.highPrice}</th>
            <th>{this.state.industry}</th>
            <th>
              <GreenBuyButton />
            </th>
            <th>
              <div className="ButtonContainer">
                <button
                  className="CancelCrossButton"
                  onClick={this.props.cancel}
                >
                  X
                </button>
              </div>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default WatchlistRowPannel;
