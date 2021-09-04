import "../../assets/css/QuoteMan.scss";

const Task = ({ task }) => {
  return (
    <table className="shareInfo">
      <tr className="headingTable">
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Volume</th>
      </tr>
      <tr className="infoTable">
        <td>{task.open}</td>
        <td>{task.high}</td>
        <td>{task.low}</td>
        <td>{task.volume}</td>
      </tr>
    </table>
  );
};

export default Task;
