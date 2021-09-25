import React from "react";
import "../../assets/css/PortfolioPage.scss";
import GreenBuyButton from "./GreenBuyButton";
import UserProfileIcon from "../UserProfileIcon";

class WatchlistRowPannel extends React.Component {
  render() {
    return (
      <div className="WatchlistRowPannel">
        <table className="TableTitleFont4">
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
            <th>{this.props.percentChange}</th>
            <th>{this.props.industry}</th>
            <th>
              <GreenBuyButton />
            </th>
            <th>
              <div className="ButtonContainer">
                <button
                  className="CancelCrossButton"
                  onClick={this.props.cancel}
                >
                  X
                </button>
              </div>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default WatchlistRowPannel;
