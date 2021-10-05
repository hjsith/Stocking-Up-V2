import React from "react";
import "../../assets/css/SignIn.scss";
import logo from "../../assets/images/stocking-up.png";
class SignInLogo extends React.Component {                      //Main Logo for All Account Pages 
  render() {
    return (
      <>
        <img src={logo} width="114" height="114" className="SignInLogo" />
      </>
    );
  }
}

export default SignInLogo;
