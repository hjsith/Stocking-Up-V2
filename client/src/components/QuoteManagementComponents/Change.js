import { useState } from "react";
import "../../assets/css/QuoteManagement.scss";
import { useLocation } from "react-router-dom";

setInterval(() => {
  const location = useLocation();

  const { listingID } = location.state;
  const [change, setChange] = useState("");
  fetch("/api/price" + "?code=" + listingID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.json().then((body) => {
      setChange(body.price);
    });
  });
}, 50);

Change.defaultProps = {
  change,
};

const Change = (props) => {
  return (
    <div class="secondpanel">
      <h4>Today's change</h4>
      <p>{change}</p>
    </div>
  );
};

export default Change;
