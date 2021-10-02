import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/QuoteManagement.scss";

import Task from "./Task";

const Tasks = () => {
  const location = useLocation();
  const { listingID } = location.state;
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [closingPrice, setClosingPrice] = useState(0);

  const [volume, setVolume] = useState(0);
  useEffect(() => {
    setInterval(() => {
      fetch("/api/listing/priceHigh" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setHighPrice(body.highPrice);
        });
      });
    }, 50);

    setInterval(() => {
      fetch("/api/listing/priceLow" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setLowPrice(body.lowPrice);
        });
      });
    }, 50);
    setInterval(() => {
      fetch("/api/listing/volumeShares" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setVolume(body.volumeShares);
        });
      });
    }, 50);

    setInterval(() => {
      fetch("/api/listing/priceClose" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setClosingPrice(body.closingPrice);
        });
      });
    }, 50);
  }, []);

  parseFloat(closingPrice).toFixed(2);
  parseFloat(lowPrice).toFixed(2);
  parseFloat(highPrice).toFixed(2);

  return (
    <>
      <table className="shareInfo">
        <tr className="headingTable">
          <th>Close</th>
          <th>Year High</th>
          <th>Year Low</th>
          <th>Volume</th>
        </tr>
        <tr className="infoTable">
          <td>${closingPrice}</td>
          <td>${highPrice}</td>
          <td>${lowPrice}</td>
          <td>{volume}</td>
        </tr>
      </table>
      );
    </>
  );
};

export default Tasks;
