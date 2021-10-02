import React from "react";
//import TableRows from "./TableRows";
import UserProfileIcon from "../UserProfileIcon";


class LeaderboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //orderArray: [],
          snackBarMessage: "",
        };
      }

    render() {
    return (
      <div className="LeaderboardResults">
        <table className="TableRows">
          <tr className="TableHeadings">
            <th><b>Picture</b></th>
            <th><b>User</b></th>
            <th><b>Ranking</b></th>
            <th><b>Net Worth</b></th>
          </tr>
          <tr>
            <th><UserProfileIcon
            name="user60"
            colorNumber={1}
            company={false}
            size={50}
            /></th>
            <th>user60</th>
            <th>#1</th>
            <th>$10000</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default LeaderboardTable;