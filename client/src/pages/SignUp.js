import React from "react";
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import letter from "../assets/images/letter.png";
import SignInLogo from "../components/UserAuthenticationComponents/SignInLogo";
import SignInLink from "../components/UserAuthenticationComponents/SignInLink";
import AuthenticationTitle from "../components/UserAuthenticationComponents/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      ConfirmPassword: "",
      Redirect: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ Email: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    this.setState({ ConfirmPassword: event.target.value });
  }

  handleSubmit(event) {
    if (
      this.state.Username != "" &&
      this.state.Password != "" &&
      this.state.Email != "" &&
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
      return <Redirect to="/Profile" />;
    }
    return (
      <div className="SignUpContainer">
        <div className="SignUp">
          <SignInLogo />

          <AuthenticationTitle message="Welcome!" />
          <div className="Additionaltext">
            {" "}
            Please fill in the following details to Sign Up:
          </div>
          <div className="FormContainer">
            <form onSubmit={this.handleSubmit}>
              <div>
                {" "}
                <input
                  className="SignUpInput"
                  type="text"
                  value={this.state.Username}
                  onChange={this.handleUsernameChange}
                  placeholder="Username"
                />
                <img src={profile} className="profile" />
              </div>
              <div>
                <input
                  className="SignUpInput"
                  type="text"
                  value={this.state.Email}
                  onChange={this.handleEmailChange}
                  placeholder="Email"
                />

                <img src={letter} className="letter" />
              </div>
              <div>
                {" "}
                <input
                  className="SignUpInput"
                  type="password"
                  value={this.state.Password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                />
                <img src={lock} className="lock" />
              </div>

              <div>
                {" "}
                <input
                  className="SignUpInput"
                  type="password"
                  value={this.state.ConfirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                />
                <img src={lock} className="lock" />
              </div>

              <input className="SignInButton" type="submit" value="SIGN UP" />
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

export default SignUp;
