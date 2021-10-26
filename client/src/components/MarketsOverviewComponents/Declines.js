import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import DeclinesPanel from "./DeclinesPanel";

class Declines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      declinesArray: []
    };
  }
  fetchTop5Declines() {
    fetch("/api/listing/Top5Declines", {
      //connecting backend to frontend
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          this.setState({ declinesArray: body });
        });
      }
    });
  }
  componentDidMount() {
    this.fetchTop5Declines(); //when the website loads the top 5 Declines  is refreshed
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
            <th>% Change</th>
            <th>Industry</th>
          </tr>
        </table>
        <div className="divDecline">
          {this.state.declinesArray.map((declines, index) => {
            return (
              <DeclinesPanel
                key={declines.ListingID}
                companyCode={declines.ListingID}
                companyName={declines.ListingName}
                currentPrice={declines.CurrentPrice}
                percentageChange={declines.change}
                industry={declines.ListingIndustry}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Declines;
