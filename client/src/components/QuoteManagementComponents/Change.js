import { useState, useContext, useEffect } from "react";
import "../../assets/css/QuoteManagement.scss";
import { useLocation } from "react-router-dom";

const Change = () => {
  const location = useLocation();
  const { listingID } = location.state;
  const [currentPrice, setCurrentPrice] = useState(0);
  const [closingPrice, setClosingPrice] = useState(0);
  const [stockChange, setStockChange] = useState(0);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/price" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setCurrentPrice(body.price);
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
  stockChange = { closingPrice } * 100;

  return (
    <div class="secondpanel">
      <h4>Today's change</h4>
      <p>{stockChange}</p>
    </div>
  );
};

export default Change;
