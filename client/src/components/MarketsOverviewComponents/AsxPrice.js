import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import AsxPricePanel from "./AsxPricePanel";

class AsxPrice extends React.Component {
  render() {
    return (
      <div>
        <TitlePanel title="ASX 200 Prices" />
        <table className="TitleTableFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>Industry</th>
            <th>Market Capitalisation</th>
          </tr>
        </table>
        <div className="divholding">
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
          <AsxPricePanel />
        </div>
        <br />
      </div>
    );
  }
}

export default AsxPrice;
