import React from "react";
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import SignInLogo from "../components/UserAuthenticationComponents/SignInLogo";
import SignInLink from "../components/UserAuthenticationComponents/SignInLink";
import AuthenticationTitle from "../components/UserAuthenticationComponents/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: "", Password: "", Redirect: false };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.Username != "" && this.state.Password != "") {
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
      <div className="LoginContainer">
        <div className="Login">
          <SignInLogo />

          <AuthenticationTitle message="Welcome!" />
          <div className="FormContainer">
            <form onSubmit={this.handleSubmit}>
              <div>
                {" "}
                <input
                  className="Usernametext"
                  type="text"
                  value={this.state.Username}
                  onChange={this.handleUsernameChange}
                  placeholder="Username"
                />
                <img src={profile} className="profile" />
              </div>
              <div>
                <input
                  className="Passwordtext"
                  type="password"
                  value={this.state.Password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                />
                <img src={lock} className="lock" />
              </div>
              <input className="SignInButton" type="submit" value="SIGN IN" />
            </form>
          </div>
          <SignInLink
            message="Don't have an account? Sign up here!"
            link="/SignUp"
          />

          <SignInLink message=" Forgot your password?" link="/ForgotPassword" />
        </div>
      </div>
    );
  }
}

export default SignIn;
