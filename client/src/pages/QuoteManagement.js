import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Header from "../components/QuoteManagementComponents/Header";
import ShareInfo from "../components/QuoteManagementComponents/ShareInfo";
import Funds from "../components/QuoteManagementComponents/Funds";
import NavBar from "../components/NavBar";
import "../assets/css/QuoteManagement.scss";
import Snackbar from "../components/Snackbar";
import TwoWeeks from "../components/QuoteManagementComponents/TwoWeeks";
import OneMonth from "../components/QuoteManagementComponents/OneMonth";
const moment = require("moment");

const QuoteManagement = () => {
  const location = useLocation(); // the useLocation is a react hook which will show the new page view based on the results of the company search page
  const { listingID } = location.state; // the listingID based on what the user selected in the Company Search page will be used to generate the correct details on the page per listingID
  const [sharePrice, setSharePrice] = useState(""); // the useState is made here in order to set the current sharePrice for the listing
  const context = useContext(UserContext); // the useContext will be used to retrieve the userID for the user logged in to the session
  const investorID = context.user.id; // the user ID based on the useContext is retrieved
  const [funds, setFunds] = useState(0); // the useState is used to show the current funds that a user has
  const [name, setName] = useState(""); // the useState is used to show the listing name on the page
  const [snackBarMessages, setSnackBarMessages] = useState([]); // the snackbar message will be used to generate messages based on what button a user clicks
  const [counter, setCounter] = useState(0); // the useState is used to show the quantity that a user selects

  //Snackbar notification implementation whereby snackbar messages are added to snackBarMessages
  const AddNotification = (NotificationMessage) => {
    let tempArray = snackBarMessages.slice();
    tempArray.push(NotificationMessage);
    setSnackBarMessages(tempArray);
    window.setTimeout(() => {
      tempArray = snackBarMessages.slice();
      tempArray.shift();
      setSnackBarMessages(tempArray);
    }, 3 * 1000);
  };

  //in this section of the code, the useEffect is used to generate the information based on the listing the user selected on the company search page. The listing ID, listing name, investorID and share price is retrieved
  useEffect(() => {
    fetch("/api/listing" + "?code=" + listingID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        setName(body.name);
      });
    });
    setInterval(() => {
      // the setInterval will retrive the shareprice, funds and investor ID as intervals, in this case it is every 50ms
      fetch("/api/price" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setSharePrice(body.price);
        });
      });
    }, 50);

    setInterval(() => {
      fetch("/api/investor?id=" + investorID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setFunds(body.Funds);
        });
      });
    }, 50);
  }, []);

  // this section of the code creates a Button, and allows each button to have different actions and display different texts. Further below in the sections of this code defines the different actions.
  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
  };

  // this section of the code shows the quantity section of the page in where the quantity number shown will increase for when a user clicks + and decrease when a user clicks .
  const increase = () => setCounter(counter + 1);
  const decrease = () => {
    if (counter >= 1) {
      setCounter(counter - 1);
    }
  };
  // this section of the code handles the buy button in the page, in where the buy button will notify the user that they could not buy a share if they do have enough funds nor inputted a quantity.
  const buyButton = () => {
    if (funds < counter * sharePrice || counter == 0) {
      AddNotification(
        "You do not have enough funds or haven't inputted a quantity!"
      );

      //in this section of the code, the buy of a share is performed in where it will create an order in the database by retrieving the listing, investor and timing information. The time information is used as there is a 15 minute timer that a user has until an order is executed after they press buy.
    } else {
      let now = moment();
      let future = moment().add(15, "minutes");
      let currentUTCTime = moment.utc(now, "YYYY-MM-DD HH:mm:ss");
      let futureUTCTime = moment.utc(future, "YYYY-MM-DD HH:mm:ss");

      fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          investorID: investorID,
          quantityOrder: counter,
          listingID: listingID,
          typeOfOrder: "BUY",
          orderTime: currentUTCTime,
          executionTime: futureUTCTime,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        // if the order is created in the back-end, the message is presented to the user that the order will be executed in 15min
        .then((res) => {
          if (res.status === 201) {
            // Successful orderCreation 201
            AddNotification(
              "Your order will be executed in 15 minutes! Go to your Portfolio to confirm or cancel this order"
            );
            //an error in the console will be shown if the order could not be created
            res.json().then((body) => {
              setFunds(funds - body.OrderTotal);
            });
          } else {
            console.log("Something unexpeceted went wrong ._.");
          }
        })
        .catch((exception) => {
          console.log("Error:", exception);
        });
      setCounter(0);
    }
  };
  //this section of the code takes actions for when a user clicks Sell. Once a user clicks sell, the order is only created if there is no 'ERROR' which is when a user has shares for the listing in the holdings and the quantity is appropriate
  const sellButton = () => {
    let now = moment();
    let currentUTCTime = moment.utc(now, "YYYY-MM-DD HH:mm:ss");

    fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        investorID: investorID,
        quantityOrder: counter,
        listingID: listingID,
        typeOfOrder: "SELL",
        orderTime: currentUTCTime,
        executionTime: currentUTCTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          // Successful orderCreation 201
          res.json().then((body) => {
            if (body == "Error") {
              // AddNotification("You do not have shares in this company");
              console.log(
                "Vishaal wanted to comment me out but I wanna stay! ):<"
              );
            } else {
              setFunds(funds - body.OrderTotal);
              // AddNotification("Sell executed!");
            }
          });
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
    setCounter(0);
  };

  // this section of the code handles when a user clicks 'Add to Watchlist'. When this happens, the watchlist route is called and the investor ID and listing ID is added to the database as a watchlist listing for the user.
  const watchlistButton = () => {
    fetch("/api/watchlist", {
      method: "POST",
      body: JSON.stringify({
        investorID: investorID,
        listingID: listingID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // this section shows messages that appear if the listing is added to the watchlist.
        if (res.status === 201) {
          console.log("Watchlist added succesfully");
          AddNotification("Watchlist added succesfully");
        } else if (res.status === 409) {
          console.log("Watchlist was not added as already exist");
          AddNotification("Watchlist was not added as already exist");
        } else {
          console.log("Something unexpeceted went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  };

  // this section of the code displays the price information to two decimal points
  parseFloat(sharePrice).toFixed(2);
  // this section creates the graph variable that will be shown on the page
  const graphs = ["2W", "1M"];
  const [graph, setGraph] = useState("");
  // this section of the code displays all the above functions into the user interface
  return (
    <>
      <NavBar />
      <Snackbar messages={snackBarMessages} />
      <div className="side1">
        <div className="BackgroundPanel1">
          <Header currentPrice={sharePrice} title={listingID} company={name} />
        </div>
        <div className="Panel2">
          <ShareInfo />
          <div />

          <div className="Panel3">
            <h2>Quantity:</h2>
            <div className="quantityContainer">
              <Button style handleClick={decrease} text="-" />
              <div className="quantityNumber">{counter}</div>
              <Button handleClick={increase} text="+" />
            </div>
            <div className="order">
              <div className="button1">
                <Button handleClick={buyButton} text="BUY" />
              </div>
              <div className="button2">
                <Button handleClick={watchlistButton} text="ADD TO WATCHLIST" />
              </div>
              <div className="button3">
                <Button handleClick={sellButton} text="SELL" />
              </div>
            </div>
          </div>

          <div className="funds">
            <Funds currentFunds={funds} />
          </div>
        </div>
      </div>
      <div className="side2">
        {graph === "" && <h3>Two Week Graph</h3>}
        {graph === "2W" && <h3>Two Week Graph</h3>}
        {graph === "1M" && <h3>One Month Graph</h3>}
        <div className="graphHeadings">
          {graphs.map((graph) => (
            <button type="button" key={graph} onClick={() => setGraph(graph)}>
              {graph.toLocaleUpperCase()}
            </button>
          ))}
        </div>
        <div className="graphs">
          {graph === "" && <TwoWeeks listingID={listingID} />}
          {graph === "2W" && <TwoWeeks listingID={listingID} />}
          {graph === "1M" && <h3>One Month</h3> && (
            <OneMonth listingID={listingID} />
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteManagement;
