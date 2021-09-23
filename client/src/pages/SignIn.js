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
    this.state = {
      Username: "",
      Password: "",
      Redirect: false,
      ErrorMessage: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.Username != "" && this.state.Password != "") {
      this.LoginInvestor();
    } else {
      this.setState({
        ErrorMessage: "One or more fields are empty, please try again"
      });
    }
    event.preventDefault();
  }

  handlePasswordChange(event) {
    this.setState({ Password: event.target.value });
  }
  LoginInvestor() {
    fetch("/api/SignIn", {
      //connects to frotnend to backend
      method: "POST",
      body: JSON.stringify({
        password: this.state.Password,
        username: this.state.Username
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          // Successful login 200
          this.setState({ Redirect: true });
        } else if (res.status === 401) {
          this.setState({
            ErrorMessage: " This username or password is incorrect"
          });
        } else {
          console.log("Something unexpeceted went wrong ._.");
        }
      })
      .catch(exception => {
        console.log("Error:", exception);
      });
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
              <div className="LoginerrorMessage">{this.state.ErrorMessage}</div>
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
