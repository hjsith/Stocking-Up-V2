import React from "react";
import "../assets/css/PriceArrow.scss";
import GreenArrow from "../assets/images/GreenUpArrow.png";
import RedArrow from "../assets/images/RedDownArrow.png";

class PriceArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowState: "",
      closePrice: "",
    };
    this.determineArrow = this.determineArrow.bind(this);
  }

  determineArrow(currentPrice) {
    fetch("/api//listing/priceClose?code=" + this.props.code, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          this.setState({ closePrice: body.closingPrice });
          if (currentPrice > this.state.closePrice) {
            this.setState({ arrowState: "Up" });
          } else if (currentPrice < this.state.closePrice) {
            this.setState({ arrowState: "Down" });
          } else {
            this.setState({ arrowState: "Level" });
          }
        });
      }
      return;
    });
  }

  componentDidMount() {
    this.determineArrow(this.props.currentPrice);
  }

  render() {
    return (
      <>
        {this.state.arrowState == "Up" ? (
          <img
            src={GreenArrow}
            width="20"
            height="20"
            className="PriceArrow"
            alt="GreenUpArrow"
          />
        ) : this.state.arrowState == "Down" ? (
          <img
            src={RedArrow}
            width="20"
            height="20"
            className="PriceArrow"
            alt="RedDownArrow"
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default PriceArrow;
