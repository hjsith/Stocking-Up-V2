import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Header from "../components/QuoteManagementComponents/Header";
import Tasks from "../components/QuoteManagementComponents/Tasks";
import Funds from "../components/QuoteManagementComponents/Funds";
import NavBar from "../components/NavBar";
import Change from "../components/QuoteManagementComponents/Change";
import "../assets/css/QuoteManagement.scss";
import Graph from "../components/QuoteManagementComponents/Graph";
const moment = require("moment");

const QuoteManagement = () => {
  const location = useLocation();
  const { listingID } = location.state;
  const [sharePrice, setSharePrice] = useState("");
  const context = useContext(UserContext);
  const investorID = context.user.id;
  const [funds, setFunds] = useState("");
  useEffect(() => {
    setInterval(() => {
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
          setFunds(body.NetWorth);
          console.log(body.NetWorth);
        });
      });
    }, 50);
  }, []);

  const [counter, setCounter] = useState(0);

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
  };

  const increase = () => setCounter(counter + 1);
  const decrease = () => {
    if (counter >= 1) {
      setCounter(counter - 1);
    }
  };

  const buyButton = () => {
    if (funds < counter * sharePrice) {
      setMessage("You do not have enough funds!");
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
        .then((res) => {
          if (res.status === 201) {
            // Successful orderCreation 201
            setMessage("Your order will be executed in 15minutes!");

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
      setMessage("");
    }
  };

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
            console.log(body);
            if (body == "Error") setMessage("You do not have enough funds");
            else setFunds(funds - body.OrderTotal);
          });
        } else {
          console.log("Something unexpeceted went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
    setCounter(0);
  };

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
        if (res.status === 201) {
          console.log("Watchlist added succesfully");
        } else {
          console.log("Something unexpeceted went wrong ._.");
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  };

  const [message, setMessage] = useState(" ");

  return (
    <>
      <NavBar />
      <div className="side1">
        <div className="BackgroundPanel1">
          <Header currentPrice={sharePrice} title={listingID} />
        </div>
        <div className="Panel2">
          <Change />
          <Tasks />
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
                <Button handleClick={buyButton} text="Buy" />
              </div>
              <div className="button2">
                <Button handleClick={watchlistButton} text="Add to Watchlist" />
              </div>
              <div className="button3">
                <Button handleClick={sellButton} text="Sell" />
              </div>
              <p>{message}</p>
            </div>
          </div>

          <div className="funds">
            <Funds funds={funds} />
          </div>
        </div>
      </div>
      <div className="side2">
        <Graph />
      </div>
    </>
  );
};

export default QuoteManagement;
