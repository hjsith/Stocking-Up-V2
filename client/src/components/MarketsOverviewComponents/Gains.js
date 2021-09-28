import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import GainsPanel from "./GainsPanel";

class Gains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gainsArray: [
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
        <TitlePanel title="Gains" />
        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>% Change</th>
            <th>Industry</th>
          </tr>
        </table>
        <div className="divorder">
          {this.state.gainsArray.map((gains, index) => {
            return (
              <GainsPanel
                key={gains.companyCode}
                colourNumber={gains.colourNumber}
                companyCode={gains.companyCode}
                companyName={gains.companyName}
                currentPrice={gains.currentPrice}
                percentageChange={gains.percentageChange}
                industry={gains.industry}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gains;
