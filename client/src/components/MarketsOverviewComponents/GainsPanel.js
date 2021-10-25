import React from "react";
import "../../assets/css/MarketsOverview.scss";
import UserProfileIcon from "../UserProfileIcon";

class GainsPanel extends React.Component {
  render() {
    return (
      <div className="GainsPanel">
        <table className="TitleTableFont2">
          <tr>
            <th>
              <UserProfileIcon
                name={this.props.companyCode}
                company={true}
                size={50}
              />
            </th>
            <th>{this.props.companyName}</th>
            <th>${this.props.currentPrice}</th>
            <th>
              <span className="GreenPriceMarkets">
                +{this.props.percentageChange}%
              </span>
            </th>
            <th>{this.props.industry}</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default GainsPanel;
