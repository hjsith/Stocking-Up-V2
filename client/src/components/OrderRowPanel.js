import React from "react";
import "../assets/css/PortfolioPage.scss";
import RedCancelButton from "./RedCancelButton";
import GreenCompletedButton from "./GreenCompletedButton";
import GreyCancelledButton from "./GreyCancelledButton";
import UserProfileIcon from "./UserProfileIcon";

class OrderRowPanel extends React.Component {
  render() {
    return <div className="OrderRowPanel"> 
     <table className="table">
     <tr>
              <th><UserProfileIcon name="A2M" /></th>
              <th>A2M</th>
              <th>Price Bought</th>
              <th>Quantity (units)</th>
              <th>Total</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th><GreenCompletedButton/> </th>
            </tr>
          </table>
          <GreenCompletedButton/>
    </div>;
  }
}

export default OrderRowPanel;
