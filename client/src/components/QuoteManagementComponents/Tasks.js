import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Task from "./Task";

const Tasks = () => {
  const location = useLocation();
  const { listingID } = location.state;
  const [highPrice, setHighPrice] = useState(0);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/priceHigh" + "?code=" + listingID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((body) => {
          setHighPrice(body.highPrice);
          console.log(body.highPrice);
        });
      });
    }, 50);

    setInterval(() => {
      fetch("/api/volumeShares" + "?code=" + listingID, {
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
  }, []);

  const [tasks, setTasks] = useState([
    {
      open: highPrice,
      high: "$5.84",
      low: "$5.73",
      volume: volume,
    },
  ]);

  return (
    <>
      {tasks.map((task) => (
        <Task key={task.open} task={task} />
      ))}
    </>
  );
};

export default Tasks;
