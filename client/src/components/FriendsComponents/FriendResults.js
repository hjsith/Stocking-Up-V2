import React from "react";
import FriendResultsRow from "./FriendResultsRowPanel";

class FriendResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
    return (
      <div>
        <br />
        <div className="FriendResults">
          <div>
            {this.props.results.map((result, index) => {
              return (
                <FriendResultsRow
                  key={result.InvestorID}
                  acc={result.InvestorID}
                  colourNumber={2}
                  username={result.Username}
                  pending={this.props.pending}
                />
              );
            })}
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default FriendResults;
