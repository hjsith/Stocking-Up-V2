import React from "react";
import "../../assets/css/PortfolioPage.scss";
import WatchlistRowPannel from "./WatchlistRowPanel";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

class Watchlist extends React.Component {
  //React constructor used to initalise local states
  constructor(props) {
    super(props);
    this.state = {
      watchlistArray: [],
      userName: "",
      unauth: false,
      searchString: "",
      results: [],
    };
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //Fetching and obtaining investor which is signed in to display information
  static contextType = UserContext;

  //Handle input changes for the search textbox
  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }

  //Update displayed threads that match the search string
  handleSearch(event) {
    let temp = [];
    for (const element of this.state.results) {
      if (element.ListingID.includes(this.state.searchString)) {
        fetch("/api/watchlist", {
          method: "POST",
          body: JSON.stringify({
            investorID: this.context.user.id,
            listingID: element.ListingID,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            // this section shows messages that appear if the listing is added to the watchlist.
            if (res.status === 201) {
              console.log("Watchlist added succesfully");
              this.props.updateSnackbar(
                "Your watchlist item has been successfully added"
              );
            } else if (res.status === 409) {
              console.log("Watchlist was not added as already exist");
              this.props.updateSnackbar(
                "Watchlist was not added as already exist"
              );
            } else {
              console.log("Something unexpeceted went wrong ._.");
            }
          })
          .catch((exception) => {
            console.log("Error:", exception);
          });
      }
    }
    this.setState({ toDisplay: temp });
  }

  //Get all listing

  fetchAllListing() {
    fetch("/api/listings", {
      method: "GET", //get
      headers: {
        "Content-Type": "application/json", //expect JSON
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // Successful login 200
          res.json().then((body) => {
            this.setState({ results: body, toDisplay: body });
          });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        } else {
          console.log("Something unexpected went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
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

  //On page load fetch API calls to get all orders made by the investor from the investor ID from the Order database and puts it within the allOrdersArray which is mapped to the AllOrderRowPanel component.
  componentDidMount() {
    this.fetchUser();
    this.fetchAllListing();

    let investorID = this.context.user.id;
    setInterval(() => {
      fetch("/api/watchlist" + "?investorID=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          this.setState({
            watchlistArray: body,
          });
        });
      });
      console.log(this.state.watchlistArray);
    }, 500);
  }

  //This render checks to see whether an investor is logged into the application to allow access to this URL, if not it redirects to the Sign In page
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
  }

  //Remove functionality for watchlist which includes deleting the watchlist from the watchlistArray and this is deleted from the watchlistremoved API route
  cancelEvent = (index, watchID) => {
    fetch("/api/watchlistremoved", {
      method: "DELETE",
      body: JSON.stringify({
        ID: watchID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const copyWatchlistArray = Object.assign([], this.state.watchlistArray);
      copyWatchlistArray.splice(index, 1);
      this.setState({
        watchlistArray: copyWatchlistArray,
      });
      this.props.updateSnackbar(
        "Your watchlist item has been successfully deleted"
      );
    });
  };

  handleAddtoWatchlist;

  render() {
    return (
      <div>
        <table className="TableWatchlistTitle">
          <tr>
            <th className="RecentOrdersWidth">
              <th className="NormalPanelTitle2">Watchlist</th>
            </th>
            <th className="RecentOrdersWidth1">
              <div className="ButtonContainer">
                <a href="/CompanySearch" className="BlueWatchlistButton">
                  + Add Company
                </a>
              </div>
            </th>
          </tr>
        </table>
        <div className="watchlistSearchWidth">
          <input
            className="searchTextfield form-control"
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearchStringChange}
            placeholder="Type an ASX-listed company code here..."
          />
          <br />
          <button className="watchlistSearchButton" onClick={this.handleSearch}>
            +
          </button>
        </div>
        <table className="TableTitleFont10">
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>Year Low Price</th>
            <th>Year High Price</th>
            <th>Industry</th>
            <th colspan="2">Actions</th>
          </tr>
        </table>
        <div className="divwatchlist">
          {/* Takes the array stored in watchlistArray and maps the data to the props */}
          {this.state.watchlistArray.map((watchlist, index) => {
            return (
              <WatchlistRowPannel
                key={watchlist.watchlistID}
                companyCode={watchlist.ListingID}
                listingID={watchlist.ListingID}
                investorID={watchlist.InvestorID}
                ID={watchlist.id}
                cancel={this.cancelEvent.bind(this, index)}
              />
            );
          })}
        </div>
        <br />
      </div>
    );
  }
}

export default Watchlist;
