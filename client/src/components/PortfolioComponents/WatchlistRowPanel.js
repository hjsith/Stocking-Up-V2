import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";

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
    fetch("/api/listing/industry" + "?code=" + this.props.companyCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        this.setState({
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
          lowPrice: body.lowPrice,
        });
      });
    });
  }

  handleBuy() {
    console.log("Bought!!");
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
            <th colSpan="2">
              <div className="ButtonContainer">
                <button className="BlueGoToCompany" onClick={this.handleBuy}>
                  Go to {this.props.companyCode}'s page
                </button>
              </div>
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
