import React from "react";
import "../assets/css/Popup.scss";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  // hideElement() {
  //   document.getElementById("Popup").style.display = "none";
  // }
  // componentDidUpdate() {
  //   if (this.props.message !== "") {
  //     setTimeout(this.hideElement, 3000);
  //   }
  // }

  render() {
    // console.log(this.props.message);
    // if (this.props.message === "" || this.props.message == undefined) {
    //   return <></>;
    // }
    return (
      <div className="PopupBlock" ref={this.myRef}>
        <div id="Popup">{this.props.message}</div>
      </div>
    );
  }
  componentDidMount() {
    this.myRef.current.style.bottom = this.props.index * 60 + "px";
  }
}

export default Popup;
