import React from "react";
import "../assets/css/PortfolioPage.scss";
import PortfolioOverviewPanel from "../components/PortfolioComponents/PortfolioOverviewPanel";
import UserProfileIcon from "../components/UserProfileIcon";
import WhiteLine from "../components/WhiteLine";
import NavBar from "../components/NavBar";
import MyHoldings from "../components/PortfolioComponents/MyHoldings";
import RecentOrders from "../components/PortfolioComponents/RecentOrders";
import Watchlist from "../components/PortfolioComponents/Watchlist";
import Snackbar from "../components/Snackbar";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarMessages: [],
      userName: "",
      unauth: false,
    };

    this.AddNotification = this.AddNotification.bind(this);
  }

  static contextType = UserContext;

  AddNotification(NotificationMessage) {
    let tempArray = this.state.snackBarMessages.slice();
    tempArray.push(NotificationMessage);
    this.setState({ snackBarMessages: tempArray });
    window.setTimeout(() => {
      tempArray = this.state.snackBarMessages.slice();
      tempArray.shift();
      this.setState({ snackBarMessages: tempArray });
    }, 5 * 1000);
  }

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

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    if (this.state.unauth || this.context.user.name === "") {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }

    return (
      <div>
        <NavBar />
        <div className="BackgroundPanel1">
          {" "}
          <table className="TableNormalNoFormat">
            <tr>
              <th width="2%">
                <UserProfileIcon
                  name={this.state.userName}
                  colorNumber={1}
                  company={false}
                  size={60}
                />
              </th>
              <th width="75%">
                <th className="NormalPanelTitle">{this.state.userName}</th>
              </th>
              <th width="20%">
                <div className="ButtonContainer">
                  <a href="/Leaderboard" className="GoldRankButton">
                    Current Rank: 152
                  </a>
                </div>
              </th>
            </tr>
          </table>
          <PortfolioOverviewPanel />
          <WhiteLine />
          <MyHoldings updateSnackbar={this.AddNotification} />
        </div>
        <div className="BackgroundPanel2">
          {" "}
          <RecentOrders updateSnackbar={this.AddNotification} />
          <WhiteLine />
          <button
            onClick={() => {
              this.AddNotification("Whats up!");
            }}
          >
            Hello
          </button>
          <Watchlist updateSnackbar={this.AddNotification} />
        </div>
        <Snackbar messages={this.state.snackBarMessages} />
      </div>
    );
  }
}

export default Portfolio;
