import React from "react";
import "../assets/css/PortfolioPage.scss";
import RedCancelButton from "./RedCancelButton";
import GreenCompletedButton from "./GreenCompletedButton";
import GreyCancelledButton from "./GreyCancelledButton";
import UserProfileIcon from "./UserProfileIcon";

class OrderRowPanel extends React.Component {
  render() {
    return <div className="OrderRowPanel"> 
     <table className="TableTitleFont2">
            <tr>
              <th><UserProfileIcon name="A2M" /> </th>
              
              <th>A2 Milk</th>
              <th>$6.52</th>
              <th>$7.02</th>
              <th>150</th>
              <th>$975</th>
              <th>
              <div className="ButtonContainer">
              <a className="CancelButton">
                Cancel
              </a>
            </div>
              </th>
            </tr>
          </table>
          
    </div>;
  }
}

export default OrderRowPanel;
