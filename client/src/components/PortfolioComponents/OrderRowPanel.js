import React from "react";
import "../../assets/css/PortfolioPage.scss";
import UserProfileIcon from "../UserProfileIcon";

class OrderRowPanel extends React.Component {
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
            <th>{this.props.companyName}</th>
            <th>{this.props.priceBought}</th>
            <th>{this.props.currentPrice}</th>
            <th>{this.props.units}</th>
            <th>{this.props.total}</th>
            <th className>
              <div className="ButtonContainer">
                <button
                  className="GreenConfirmButton"
                  onClick={this.props.cancel}
                >
                  Confirm
                </button>
              </div>
            </th>
            <th>
              <div className="ButtonContainer">
                <button className="CancelButton" onClick={this.props.cancel}>
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
