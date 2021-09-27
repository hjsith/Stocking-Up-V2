import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import DeclinesPanel from "./DeclinesPanel";

class Declines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      declinesArray: [
        {
          colourNumber: 1,
          companyCode: "A2M",
          companyName: "A2 Milk",
          currentPrice: "$7.02",
          percentageChange: "+2.10%",
          industry: "Consumer Staples"
        },
        {
          colourNumber: 2,
          companyCode: "WIS",
          companyName: "Wistech Global",
          currentPrice: "$47.02",
          percentageChange: "-1.21%",
          industry: "Logistics"
        },
        {
          colourNumber: 4,
          companyCode: "CBA",
          companyName: "Commonwealth Bank",
          currentPrice: "$64.02",
          percentageChange: "+3.10%",
          industry: "Banking and Financial Services"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <TitlePanel title="Declines" />
        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>% change</th>
            <th>Industry</th>
          </tr>
        </table>
        <div className="divorder">
          {this.state.declinesArray.map((declines, index) => {
            return (
              <DeclinesPanel
                key={declines.companyCode}
                colourNumber={declines.colourNumber}
                companyCode={declines.companyCode}
                companyName={declines.companyName}
                currentPrice={declines.currentPrice}
                percentageChange={declines.percentageChange}
                industry={declines.industry}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Declines;
