import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";

class HoldingsRowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
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

  render() {
    return (
      <div className="AllOrderRowPanel">
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
