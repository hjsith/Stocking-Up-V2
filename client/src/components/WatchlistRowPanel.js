import React from "react";
import "../assets/css/PortfolioPage.scss";
import UserProfileIcon from "./UserProfileIcon";
import GreenCompletedButton from "./GreenCompletedButton";

class WatchlistRowPannel extends React.Component {
  handelBuy() {
    console.log("Bought!");
  }

  render() {
    return (
      <div className="WatchlistRowPannel">
        <table className="TableTitleFont4">
          <tr>
            <th>
              <UserProfileIcon name="A2M" />{" "}
            </th>
            <th>A2 Milk</th>
            <th>$6.52</th>
            <th>+ 0.2%</th>
            <th>Consumer Staple</th>
            <th>
              <button className="GreenBuyButton" onClick={this.handelBuy}>
                Buy
              </button>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default WatchlistRowPannel;
