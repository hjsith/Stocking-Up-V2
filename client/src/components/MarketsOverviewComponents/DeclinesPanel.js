import React from "react";
import "../../assets/css/MarketsOverview.scss";
import UserProfileIcon from "../UserProfileIcon";

class DeclinesPanel extends React.Component {
  render() {
    return (
      <div className="DeclinesPanel">
        <table className="TitleTableFont3">
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
              <span className="RedPriceMarkets">{this.props.percentageChange}% </span>
            </th>

            <th>{this.props.industry}</th>
            <th></th>
          </tr>
        </table>
      </div>
    );
  }
}

export default DeclinesPanel;
