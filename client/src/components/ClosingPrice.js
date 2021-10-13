import React from "react";
import "../assets/css/DiscussionBoard.scss";

class PriceArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowState: "",
      closePrice: "",
    };
    this.PriceChange = this.PriceChange.bind(this);
  }

  PriceChange() {
    fetch("/api//listing/priceClose?code=" + this.props.code, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          this.setState({ closePrice: body.closingPrice });
          if (this.props.currentPrice > body.closingPrice) {
            this.setState({ arrowState: "Up" });
          } else if (this.props.currentPrice < body.closingPrice) {
            this.setState({ arrowState: "Down" });
          } else {
            this.setState({ arrowState: "Level" });
          }
        });
      }
    });
  }
  componentDidMount() {
    this.PriceChange();
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.PriceChange();
    }
  }

  render() {
    return (
      <>
        {this.state.arrowState == "Up" ? (
          <span className="GreenPrice">
            (+{(this.props.currentPrice - this.state.closePrice).toFixed(2)})
          </span>
        ) : this.state.arrowState == "Down" ? (
          <span className="RedPrice">
            (-{(this.state.closePrice - this.props.currentPrice).toFixed(2)})
          </span>
        ) : (
          <span className="GrayPrice">(+0.0)</span>
        )}
      </>
    );
  }
}

export default PriceArrow;
