import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/QuoteManagement.scss";

// this section of the code displays the close, high, low and volume for each listing.
const ShareInfo = () => {
  const location = useLocation(); // the useLocation is a react hook which will show the new page view based on the results of the company search page
  const { listingID } = location.state; // the listingID based on what the user selected in the Company Search page will be used to generate the correct details on the page per listingID
  const [highPrice, setHighPrice] = useState(0); // the useState is made here in order to set the current high Price for the listing
  const [lowPrice, setLowPrice] = useState(0); // the useState is made here in order to set the current low Price for the listing
  const [closingPrice, setClosingPrice] = useState(0); // the useState is made here in order to set the current closing Price for the listing

  const [volume, setVolume] = useState(0); // the useState is made here in order to set the volume for the listing
  useEffect(() => {
    // this section of the code retrieves the high price of shares which is updated every 50ms

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
    // this section of the code retrieves the low price of shares which is updated every 50ms

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
    // this section of the code retrieves the volume of shares which is updated every 50ms

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
    // this section of the code retrieves the closing price which is updated every 50ms
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
  // this section of the code displays the price information to two decimal points
  parseFloat(closingPrice).toFixed(2);
  parseFloat(lowPrice).toFixed(2);
  parseFloat(highPrice).toFixed(2);
  //the below section of the code displays the listing price information
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

export default ShareInfo;
