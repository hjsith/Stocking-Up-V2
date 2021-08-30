import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/UpdatePassword.scss";
import Logo from "../assets/images/stocking-up.png";
class UpdatePassword extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="PageContainer">
          <div className="PasswordChangeContainer">
            <img src={Logo} className="Logo" />
            <div className="Title">Update Your Password?</div>
            <div className="FormContainer"></div>
          </div>
        </div>
      </>
    );
  }
}

export default UpdatePassword;
