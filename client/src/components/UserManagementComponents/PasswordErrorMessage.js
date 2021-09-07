import React from "react";
import "../../assets/css/UpdatePassword.scss";

class PasswordErrorMessage extends React.Component {
  render() {
    return <div className="PasswordErrorMessage">{this.props.message}</div>;
  }
}

export default PasswordErrorMessage;
