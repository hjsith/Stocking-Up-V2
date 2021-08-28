import React from "react";
import "../assets/css/PortfolioPage.scss";
import UserProfileIcon from "./UserProfileIcon";

class WatchlistRowPannel extends React.Component {
  render() {
    return <div className="WatchlistRowPannel"> 
     <table className="TableTitleFont2">
            <tr>
              <th><UserProfileIcon name="A2M" /> </th>
              <th>A2 Milk</th>
              <th>$6.52</th>
              <th>Consumer Staple</th>
              <th></th>
            </tr>
          </table>
          
    </div>;
  }
}

export default WatchlistRowPannel;
