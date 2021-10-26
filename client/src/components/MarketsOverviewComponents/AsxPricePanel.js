import React from "react";
import "../../assets/css/MarketsOverview.scss";
import UserProfileIcon from "../UserProfileIcon";

class AsxPricePanel extends React.Component {
  render() {
    return (
      <div className="AsxPricePanel">
        <table className="TitleTableFont4">
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
            <th>{this.props.industry}</th>
            <th>${this.props.marketsCapitalisation}</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default AsxPricePanel;
