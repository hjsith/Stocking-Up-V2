import { useState } from "react";
import Header from "../components/QuoteManagementComponents/Header";
import Tasks from "../components/QuoteManagementComponents/Tasks";
import Funds from "../components/QuoteManagementComponents/Funds";
import NavBar from "../components/NavBar";
import Change from "../components/QuoteManagementComponents/Change";
import "../assets/css/QuoteManagement.scss";
import Graph from "../components/QuoteManagementComponents/Graph";
import { buyOrder } from "../connection/Orders";

const QuoteManagement = () => {
  var sharePrice = 5.73;

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

  const [funds, setFunds] = useState(5000);

  const buyButton = () => {
    if (funds < counter * sharePrice) {
      setMessage("You do not have enough funds!");
    } else {
      let investorID = "09bdd9ca-8240-45b3-8ec8-56b1c1e2cb73";
      let listingID = "A2M";
      buyOrder(investorID, counter, listingID)
        .then((res) => {
          if (res.status === 201) {
            // Successful orderCreation 201
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
    setFunds(funds + counter * sharePrice);
    setCounter(0);
    setMessage("");
  };

  const [message, setMessage] = useState(" ");

  return (
    <>
      <NavBar />
      <div className="side1">
        <div className="BackgroundPanel1">
          <Header currentPrice={sharePrice} title={"A2 MILK - A2M"} />
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
                <Button text="Add to Watchlist" />
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

// this is the root component, called in index.js from index.html
