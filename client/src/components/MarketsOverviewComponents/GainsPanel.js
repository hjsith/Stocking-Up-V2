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
                colorNumber={this.props.colourNumber}
                company={true}
                size={50}
              />
            </th>
            <th>{this.props.companyName}</th>
            <th>{this.props.currentPrice}</th>
            <th>{this.props.percentageChange}</th>
            <th>{this.props.industry}</th>
            <th></th>
          </tr>
        </table>
      </div>
    );
  }
}

export default GainsPanel;
