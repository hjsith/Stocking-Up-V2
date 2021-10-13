import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";
import PriceArrow from "../PriceArrow";
import ClosingPrice from "../ClosingPrice";

class OrderRowPanel extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      disable: false,
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
      <div className="OrderRowPanel">
        {/* table used to map out the information within each row seen via props retrieved from the front end (RecentOrders) */}
        <table className="TableTitleFont5">
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
            <th>
              {this.state.price}
              <ClosingPrice
                currentPrice={this.state.price}
                code={this.props.companyCode}
              />
              <PriceArrow
                currentPrice={this.state.price}
                code={this.props.companyCode}
              />
            </th>
            <th>{this.props.units}</th>
            <th>{this.props.total}</th>
            {/* button functionality to confirm order and upon confirmation to disable the button */}
            <th className>
              <div className="ButtonContainer">
                <button
                  disabled={this.state.disable}
                  className="GreenConfirmButton"
                  onClick={() => {
                    this.props.confirm(this.props.orderID);
                    this.setState({ disable: true });
                  }}
                >
                  Confirm
                </button>
              </div>
            </th>
            {/* button functionality to cancel an order */}
            <th>
              <div className="ButtonContainer">
                <button
                  disabled={this.state.disable}
                  className="CancelButton"
                  onClick={() => {
                    this.props.cancel(this.props.orderID);
                  }}
                >
                  Cancel
                </button>
              </div>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default OrderRowPanel;
