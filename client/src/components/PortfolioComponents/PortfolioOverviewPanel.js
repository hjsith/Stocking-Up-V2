import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WhiteLine from "../WhiteLine";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";
import GreenArrow from "../../assets/images/GreenUpArrow.png";
import RedArrow from "../../assets/images/RedDownArrow.png";

class PortfolioOverviewPanel extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: new Date(),
      userName: "",
      userNetWorth: "",
      userRank: "",
      funds: "",
      unauth: false,
      profit: "",
    };
  }

  //Fetching and obtaining investor which is signed in to display information
  static contextType = UserContext;

  fetchUser() {
    fetch("/api/investor?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) =>
          this.setState({
            userName: body.InvestorFName + " " + body.InvestorLName,
            userNetWorth: "" + body.NetWorth,
            funds: "" + body.Funds,
            userRank: body.InvestorRanking,
          })
        );
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  fetchProfit() {
    fetch("/api/holdingsprofit?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) =>
          this.setState({
            profit: body.profit.toFixed(2),
          })
        );
      }
    });
  }

  //Function that outputs the current date in DD/MM/YYYY format
  currentDate() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  //Function that outputs the current time in 24 hour time
  currentTime() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  //On page load fetch API calls to get all orders made by the investor from the investor ID from the Order database and puts it within the allOrdersArray which is mapped to the AllOrderRowPanel component.
  componentDidMount() {
    this.fetchUser();
    this.fetchProfit();
  }

  render() {
    return (
      <div className="PortfolioOverviewPanel">
        <table className>
          <tr>
            <th className="PortfolioOverviewTitle">Portfolio Value</th>
          </tr>
          <tr>
            <th className="PortfolioOverviewValue">
              ${this.state.userNetWorth}
            </th>
          </tr>
          <tr>
            {this.state.profit > 0 ? (
              <th className="PortfolioPriceIncrease">
                <img
                  src={GreenArrow}
                  width="20"
                  height="20"
                  className="PriceArrow"
                  alt="GreenUpArrow"
                />
                (+ ${this.state.profit})
              </th>
            ) : (
              <th className="PortfolioPriceDecrease">
                <img
                  src={RedArrow}
                  width="20"
                  height="20"
                  className="PriceArrow"
                  alt="GreenUpArrow"
                />
                (- ${this.state.profit})
              </th>
            )}
          </tr>
          <tr>
            {/* Output of functionality of current date and time via toLocaleDateString/ toLocaleTimeString */}
            <th className="PortfolioDateFont">
              {" "}
              Today: {this.state.date.toLocaleDateString()}{" "}
              {this.state.date.toLocaleTimeString()}
            </th>
          </tr>
        </table>
        <WhiteLine />
        <table className>
          <tr>
            <th className="PortfolioBalanceFont">Account Balance:</th>
            <th className="PortfolioBalanceFont"> ${this.state.funds}</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default PortfolioOverviewPanel;
