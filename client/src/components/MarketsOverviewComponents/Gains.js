import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import GainsPanel from "./GainsPanel";

class Gains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gainsArray: []
    };
  }
  fetchTop5Gains() {
    fetch("/api/listing/Top5Gains", {
      //connecting backend to frontend
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          this.setState({ gainsArray: body });
        });
      }
    });
  }
  componentDidMount() {
    this.fetchTop5Gains(); //when the website loads the top 5 Gains  is refreshed
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
        <div className="divGains">
          {this.state.gainsArray.map((gains, index) => {
            return (
              <GainsPanel
                key={gains.ListingID}
                companyCode={gains.ListingID}
                companyName={gains.ListingName}
                currentPrice={gains.CurrentPrice}
                percentageChange={gains.change}
                industry={gains.ListingIndustry}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gains;
