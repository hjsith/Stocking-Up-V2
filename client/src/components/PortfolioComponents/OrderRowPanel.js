import React from "react";
import "../../assets/css/PortfolioPage.scss";
import RedCancelButton from "./RedCancelButton";
import UserProfileIcon from "../UserProfileIcon";

class OrderRowPanel extends React.Component {
  render() {
    return (
      <div className="OrderRowPanel">
        <table className="TableTitleFont2">
          <tr>
            <th>
              <UserProfileIcon
                name="A2M"
                colorNumber={2}
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
              <RedCancelButton />
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default OrderRowPanel;
