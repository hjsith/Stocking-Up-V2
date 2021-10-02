import { useState } from "react";
import Task from "./Task";
import { useLocation } from "react-router-dom";

const Tasks = () => {
  const location = useLocation();
  const { listingID } = location.state;
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [volume, setVolume] = useState("");
  const [year, setYear] = useState("");

  setInterval(() => {
    fetch("/listing/priceHigh" + "?code=" + listingID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        setOpen(body.highPrice);
      });
    });
  }, 50);

  return (
    <>
      <h1>{open}</h1>
    </>
  );
};

export default Tasks;
