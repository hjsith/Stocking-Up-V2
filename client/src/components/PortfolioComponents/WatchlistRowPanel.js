import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";
import { Link } from "react-router-dom";

class WatchlistRowPannel extends React.Component {
  //React constructor used to initalise local states
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

  //On page load fetch API calls to get listing industry, listing name, price high, price low and current price from the Listing and Price database.
  componentDidMount() {
    fetch("/api/listing/industry" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          //from Listing model using the company code obtaining the industry name
          industry: body.name,
        });
      });
    });

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

    fetch("/api/listing/priceHigh" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          //from Listing model using the company code obtaining the price high
          highPrice: body.highPrice,
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

    fetch("/api/listing/priceLow" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
          //from Listing model using the company code obtaining the price low
          lowPrice: body.lowPrice,
        });
      });
    });
  }

  render() {
    return (
      <div className="WatchlistRowPannel">
        {/* table used to map out the information within each row seen via props retrieved from the front end (Watchlist) */}
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
            <th colSpan="2">
              <div className="ButtonContainer">
                {/* link used to reroute investor the listing page on click passing through the companyCode */}
                <Link
                  to={{
                    pathname: "/QuoteManagement",
                    state: { listingID: this.props.companyCode },
                  }}
                >
                  <div className="BlueGoToCompany">
                    {this.state.currentListingPrice}{" "}
                    <span>Go to {this.props.companyCode}'s page</span>
                  </div>
                </Link>
              </div>
              {/* button to delete watchlist from investor */}
              <div className="ButtonContainer">
                <button
                  className="CancelCrossButton"
                  onClick={() => {
                    this.props.cancel(this.props.ID);
                  }}
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
