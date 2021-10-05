import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import AsxPricePanel from "./AsxPricePanel";

class AsxPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asxPriceArray: [
        {
          colourNumber: 6,
          companyCode: "A2M",
          companyName: "A2 Milk",
          currentPrice: "$7.02",
          industry: "Consumer Staples",
          marketsCapitalisation: "$4.46B"
        },
        {
          colourNumber: 4,
          companyCode: "CBA",
          companyName: "Commonwealth Bank",
          currentPrice: "$64.02",
          industry: "Banking and Financial Services",
          marketsCapitalisation: "$185.55B"
        },
        {
          colourNumber: 2,
          companyCode: "WIS",
          companyName: "Wisetech Global",
          currentPrice: "$47.02",
          industry: "Logistics",
          marketsCapitalisation: "$17.41B"
        },
        {
          colourNumber: 3,
          companyCode: "MQG",
          companyName: "Macquarie Group",
          currentPrice: "$180.84",
          industry: "Financial Services",
          marketsCapitalisation: "$66.67B"
        },
        {
          colourNumber: 5,
          companyCode: "BRK",
          companyName: "Brickworks",
          currentPrice: "$25.50",
          industry: "Materials",
          marketsCapitalisation: "$3.93B"
        },
        {
          colourNumber: 1,
          companyCode: "A2M",
          companyName: "A2 Milk",
          currentPrice: "$7.02",
          industry: "Consumer Staples",
          marketsCapitalisation: "$4.46B"
        },
        {
          colourNumber: 4,
          companyCode: "CBA",
          companyName: "Commonwealth Bank",
          currentPrice: "$64.02",
          industry: "Banking and Financial Services",
          marketsCapitalisation: "$185.55B"
        },
        {
          colourNumber: 2,
          companyCode: "WIS",
          companyName: "Wisetech Global",
          currentPrice: "$47.02",
          industry: "Logistics",
          marketsCapitalisation: "$17.41B"
        },
        {
          colourNumber: 3,
          companyCode: "MQG",
          companyName: "Macquarie Group",
          currentPrice: "$180.84",
          industry: "Financial Services",
          marketsCapitalisation: "$66.67B"
        },
        {
          colourNumber: 5,
          companyCode: "BRK",
          companyName: "Brickworks",
          currentPrice: "$25.50",
          industry: "Materials",
          marketsCapitalisation: "$3.93B"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <TitlePanel title="ASX 200 Prices" />
        <table className="TitleTableFontAsx">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>Industry</th>
            <th>Market Capitalisation</th>
          </tr>
        </table>
        <div className="divAsx">
          {this.state.asxPriceArray.map((asxprice, index) => {
            return (
              <AsxPricePanel
                key={asxprice.companyCode}
                colourNumber={asxprice.colourNumber}
                companyCode={asxprice.companyCode}
                companyName={asxprice.companyName}
                currentPrice={asxprice.currentPrice}
                industry={asxprice.industry}
                marketsCapitalisation={asxprice.marketsCapitalisation}
              />
            );
          })}
        </div>
        <br />
      </div>
    );
  }
}

export default AsxPrice;
