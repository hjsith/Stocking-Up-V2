import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";

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
      <div className="AllOrderRowPanel">
        {/* table used to map out the information within each row seen in All Order Page via props retrieved from the front end */}
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
            <th>{this.props.typeofOrder}</th>
            <th>{this.props.status}</th>
            <th>{this.props.listingPrice}</th>
            <th>{this.props.quantityOrder}</th>
            <th>{this.props.orderTotal}</th>
            <th>{this.props.orderTime}</th>
            <th>{this.props.executedTime}</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default HoldingsRowPanel;
