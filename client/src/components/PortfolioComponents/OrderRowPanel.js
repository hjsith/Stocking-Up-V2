import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";

class OrderRowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      disable: false,
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
      <div className="OrderRowPanel">
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
            <th>{this.state.price}</th>
            <th>{this.props.units}</th>
            <th>{this.props.total}</th>
            <th className>
              <div className="ButtonContainer">
                <button
                  disabled={this.state.disable}
                  className="GreenConfirmButton"
                  onClick={() => {
                    this.props.confirm(this.props.orderID);
                    this.setState({ disable: true });
                    // className = "GreyButton";
                  }}
                >
                  Confirm
                </button>
              </div>
            </th>
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
