import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/UpdatePassword.scss";
import Logo from "../assets/images/stocking-up.png";
import PasswordErrorMessage from "../components/UserManagementComponents/PasswordErrorMessage";
import { Redirect } from "react-router-dom";

const passwordRegex = new RegExp(
  "(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}"
);

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InitialPassword: "",
      PasswordToConfirm: "",
      initalErrorMessage: "",
      ConfirmErrorMessage: "",
      redirect: false,
    };
    this.handleInitialPassword = this.handleInitialPassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInitialPassword(event) {
    this.setState({ InitialPassword: event.target.value });
  }

  handlePasswordConfirm(event) {
    this.setState({ PasswordToConfirm: event.target.value });
  }

  handleSubmit(event) {
    var determineRedirect = true;
    if (passwordRegex.test(this.state.InitialPassword)) {
      if (this.state.initalErrorMessage !== "") {
        this.setState({ initalErrorMessage: "" });
      }
    } else {
      if (this.state.initalErrorMessage === "") {
        this.setState({
          initalErrorMessage:
            "Password is not in the specified format. Please follow the tooltip.",
        });
      }
      determineRedirect = false;
    }

    if (this.state.InitialPassword === this.state.PasswordToConfirm) {
      if (this.state.ConfirmErrorMessage !== "") {
        this.setState({ ConfirmErrorMessage: "" });
      }
    } else {
      if (this.state.ConfirmErrorMessage === "") {
        this.setState({
          ConfirmErrorMessage:
            "Provided passwords do not match. Please type them in again.",
        });
      }
      determineRedirect = false;
    }

    if (determineRedirect) {
      this.setState({ redirect: true });
    }
    event.preventDefault();
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/Profile",
            state: {
              snackBarMessage: "Password has been successfully updated!",
            },
          }}
        />
      );
    }

    return (
      <>
        <NavBar />
        <div className="PageContainer">
          <div className="PasswordChangeContainer">
            <img src={Logo} className="Logo" alt="Stocking Up Logo" />
            <div className="PasswordTitle">Update Your Password?</div>
            <div className="FormContainer">
              <form onSubmit={this.handleSubmit} className="PasswordUpdateForm">
                <label className="FormLabel">Enter your new password:</label>
                <div className="passowrdToolTip">
                  <input
                    className="inputTextfield"
                    type="password"
                    value={this.state.InitialPassword}
                    onChange={this.handleInitialPassword}
                    placeholder="New password"
                  />
                  <div className="passwordToolTipText">
                    Your password must contain at least 8 characters, 1 upper
                    case letter, 1 number and 1 special character!
                  </div>
                </div>
                <PasswordErrorMessage message={this.state.initalErrorMessage} />
                <label className="FormLabel">Confirm your password:</label>
                <div>
                  <input
                    className="inputTextfield"
                    type="password"
                    value={this.state.PasswordToConfirm}
                    onChange={this.handlePasswordConfirm}
                    placeholder="Confirm password"
                  />
                </div>
                <PasswordErrorMessage
                  message={this.state.ConfirmErrorMessage}
                />
                <input
                  className="UpdateButton"
                  type="submit"
                  value="Update Password"
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UpdatePassword;
