import React from "react";
import "../../assets/css/SignIn.scss";
import logo from "../../assets/images/stocking-up.png";
class SignInLogo extends React.Component {
  render() {
    return (
      <>
        <img src={logo} width="114" height="114" className="SignInLogo" />
      </>
    );
  }
}

export default SignInLogo;
