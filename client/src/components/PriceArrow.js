import React from "react";
import "../assets/css/PriceArrow.scss";
import GreenArrow from "../assets/images/GreenUpArrow.png";
import RedArrow from "../assets/images/RedDownArrow.png";

class PriceArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowState: "",
    };
    this.determineArrow = this.determineArrow.bind(this);
  }

  determineArrow() {
    fetch("/api//listing/priceClose?code=" + this.props.code, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          if (this.props.currentPrice > body.closingPrice) {
            this.setState({ arrowState: "Up" });
          } else if (this.props.currentPrice < body.closingPrice) {
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
    this.determineArrow();
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.determineArrow();
    }
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
