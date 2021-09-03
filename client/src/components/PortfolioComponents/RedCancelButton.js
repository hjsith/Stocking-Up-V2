import React from "react";
import "../../assets/css/PortfolioPage.scss";

class RedCancelButton extends React.Component {
  handleCancel() {
    console.log("Cancelled!");
  }

  render() {
    return (
      <div className="ButtonContainer">
        <button className="CancelButton" onClick={this.handleCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

export default RedCancelButton;
