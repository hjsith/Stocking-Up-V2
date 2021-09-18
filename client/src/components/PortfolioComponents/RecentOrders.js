import React from "react";
import "../../assets/css/PortfolioPage.scss";
import PanelTitle from "./PanelTitle";
import Popup from "../../components/Popup";
import OrderRowPanel from "./OrderRowPanel";

class RecentOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [
        {
          colourNumber: 1,
          companyCode: "A2M",
          companyName: "A2 Milk",
          priceBought: "$6.52",
          currentPrice: "$7.02",
          units: "150",
          total: "$975",
        },
        {
          colourNumber: 2,
          companyCode: "WIS",
          companyName: "Wistech Global",
          priceBought: "$43.52",
          currentPrice: "$47.02",
          units: "150",
          total: "$2200",
        },
        {
          colourNumber: 4,
          companyCode: "CBA",
          companyName: "Commonwealth Bank",
          priceBought: "$62.52",
          currentPrice: "$64.02",
          units: "150",
          total: "$2,865.98",
        },
      ],
      snackBarMessage: "",
    };
  }

  cancelEvent = (index) => {
    const copyOrderArray = Object.assign([], this.state.orderArray);
    copyOrderArray.splice(index, 1);
    this.setState({
      orderArray: copyOrderArray,
      snackBarMessage: "Your order for has successfully been deleted!",
      //Ask James on how to do it when you delete multiple things
    });
  };

  render() {
    return (
      <div>
        <table className="TableWatchlistTitle">
          <tr>
            <th width="78%">
              <th className="NormalPanelTitle2">Recent Orders</th>
            </th>
            <th th width="19%">
              <div className="ButtonContainer">
                <a href="/CompanySearch" className="BlueWatchlistButton">
                  All My Orders
                </a>
              </div>
            </th>
          </tr>
        </table>

        <table className="TableTitleFont">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Price Bought</th>
            <th>Current Price</th>
            <th>Quantity (units)</th>
            <th>Total ($)</th>
            <th>Status</th>
          </tr>
        </table>
        <div className="divorder">
          {this.state.orderArray.map((order, index) => {
            return (
              <OrderRowPanel
                key={order.companyCode}
                colourNumber={order.colourNumber}
                companyCode={order.companyCode}
                companyName={order.companyName}
                priceBought={order.priceBought}
                currentPrice={order.currentPrice}
                units={order.units}
                total={order.total}
                cancel={this.cancelEvent.bind(this, index)}
              />
            );
          })}
        </div>
        <div>
          <Popup message={this.state.snackBarMessage} />
        </div>
      </div>
    );
  }
}

export default RecentOrders;
