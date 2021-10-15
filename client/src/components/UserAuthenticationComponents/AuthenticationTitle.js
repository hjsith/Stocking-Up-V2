import React from "react";
import "../../assets/css/SignIn.scss";

class AuthenticationTitle extends React.Component {
  render() {
    return (
      <>
        <div className="Welcome">{this.props.message}</div>
      </>
    );
  }
}

export default AuthenticationTitle;
