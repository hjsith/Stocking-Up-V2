import React from "react";
import "../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import UserProfileIcon from "./UserProfileIcon";

class WatchlistRowPannel extends React.Component {
  render() {
    return (
      <div className="WatchlistRowPannel">
        <table className="TableTitleFont4">
          <tr>
            <th>
              <UserProfileIcon
                name="A2M"
                colorNumber={1}
                company={true}
                size={50}
              />
            </th>
            <th>A2 Milk</th>
            <th>$6.52</th>
            <th>+ 0.2%</th>
            <th>Consumer Staple</th>
            <th>
              <GreenBuyButton />
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default WatchlistRowPannel;
