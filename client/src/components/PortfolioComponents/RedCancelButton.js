import React from "react";
import "../../assets/css/PortfolioPage.scss";

class RedCancelButton extends React.Component {
  handelCancel() {
    console.log("Cancelled!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="CancelButton" onClick={this.handelCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

export default RedCancelButton;
