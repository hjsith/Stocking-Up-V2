import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WhiteLine from "../WhiteLine";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class PortfolioOverviewPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: new Date(),
      userName: "",
      unauth: false,
    };
  }

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
          })
        );
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  currentDate() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  currentTime() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="PortfolioOverviewPanel">
        <table className>
          <tr>
            <th className="PortfolioOverviewTitle">Portfolio Value</th>
          </tr>
          <tr>
            <th className="PortfolioOverviewValue">$10,978</th>
          </tr>
          <tr>
            <th className="PortfolioPriceIncrease">(+ $978.00 )</th>
          </tr>
          <tr>
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
            <th className="PortfolioBalanceFont">$9,022.00</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default PortfolioOverviewPanel;
