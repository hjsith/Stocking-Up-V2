import React from "react";
import "../../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import RedSellButton from "./RedSellButton";
import UserProfileIcon from "../UserProfileIcon";

class HoldingsRowPanel extends React.Component {
  render() {
    return (
      <div className="HoldingsRowPanel">
        <table className="TableTitleFont2">
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
            <th>$7.02</th>
            <th>150</th>
            <th>$975</th>
            <th>
              <GreenBuyButton />
            </th>
            <th>
              <RedSellButton />
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default HoldingsRowPanel;
