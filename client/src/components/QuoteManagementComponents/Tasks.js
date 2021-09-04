import { useState } from "react";
import Task from "./Task";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      open: "$5.78",
      high: "$5.84",
      low: "$5.73",
      volume: "7.975M",
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
