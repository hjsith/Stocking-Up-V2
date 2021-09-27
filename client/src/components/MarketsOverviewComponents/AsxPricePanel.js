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
                name="A2M"
                colorNumber={0}
                company={true}
                size={50}
              />
            </th>

            <th>A2 Milk</th>
            <th>$6.52</th>
            <th>Consumer Staples</th>
            <th>$4,469,110,680</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default AsxPricePanel;
