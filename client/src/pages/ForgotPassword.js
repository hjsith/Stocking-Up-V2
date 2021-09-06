import React from "react";
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import SignInLogo from "../components/SignInLogo";
import SignInLink from "../components/SignInLink";
import AuthenticationTitle from "../components/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { Redirect } from "react-router-dom";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      ConfirmPassword: "",
      Redirect: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    this.setState({ ConfirmPassword: event.target.value });
  }

  handleSubmit(event) {
    if (
      this.state.Username != "" &&
      this.state.Password != "" &&
      this.state.ConfirmPassword != ""
    ) {
      this.setState({ Redirect: true });
    }
    event.preventDefault();
  }

  handlePasswordChange(event) {
    this.setState({ Password: event.target.value });
  }
  render() {
    if (this.state.Redirect == true) {
      return <Redirect to="/SignIn" />;
    }
    return (
      <div className="ForgotPasswordContainer">
        <div className="ForgotPassword">
          <SignInLogo />

          <AuthenticationTitle message="Forgot Your Password?" />
          <div className="Additionaltext">
            {" "}
            Please fill in the following details to create a new password:
          </div>
          <div className="FormContainer">
            <form onSubmit={this.handleSubmit}>
              <div>
                {" "}
                <input
                  className="ForgotPasswordInput"
                  type="text"
                  value={this.state.Username}
                  onChange={this.handleUsernameChange}
                  placeholder="Username"
                />
                <img src={profile} className="profile" />
              </div>

              <div>
                {" "}
                <input
                  className="ForgotPasswordInput"
                  type="password"
                  value={this.state.Password}
                  onChange={this.handlePasswordChange}
                  placeholder=" New Password"
                />
                <img src={lock} className="lock" />
              </div>

              <div>
                {" "}
                <input
                  className="ForgotPasswordInput"
                  type="password"
                  value={this.state.ConfirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                />
                <img src={lock} className="lock" />
              </div>

              <input className="SignInButton" type="submit" value="CONFIRM" />
            </form>
          </div>
          <SignInLink
            message="Already have an account? Sign in here!"
            link="/SignIn"
          />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;