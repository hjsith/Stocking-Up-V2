import React from "react";
import "../../assets/css/MarketsOverview.scss";
import TitlePanel from "./TitlePanel";
import AsxPricePanel from "./AsxPricePanel";

class AsxPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asxPriceArray: []
    };
  }
  fetchTop200() {
    fetch("/api/listing/Top200", {
      //connecting backend to frontend
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          this.setState({ asxPriceArray: body });
        });
      }
    });
  }
  componentDidMount() {
    this.fetchTop200(); //when the website loads the top 200 component is refreshed
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
            console.log(this.state.currentPrices);
            return (
              <AsxPricePanel
                key={asxprice.ListingID}
                companyCode={asxprice.ListingID}
                companyName={asxprice.ListingName}
                currentPrice={asxprice.CurrentPrice}
                industry={asxprice.ListingIndustry}
                marketsCapitalisation={asxprice.MarketCap}
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
