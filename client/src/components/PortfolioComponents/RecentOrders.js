import React from "react";
import "../../assets/css/PortfolioPage.scss";
import PanelTitle from "./PanelTitle";
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
    };
  }

  cancelEvent = (index) => {
    const copyOrderArray = Object.assign([], this.state.orderArray);
    copyOrderArray.splice(index, 1);
    this.setState({
      orderArray: copyOrderArray,
      // snackBarMessage: "Password has been successfully updated!",
    });
  };

  render() {
    return (
      <div>
        <PanelTitle title="Recent Orders" />
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
      </div>
    );
  }
}

export default RecentOrders;
