import React from "react"; //imports required
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import SignInLogo from "../components/UserAuthenticationComponents/SignInLogo";
import SignInLink from "../components/UserAuthenticationComponents/SignInLink";
import AuthenticationTitle from "../components/UserAuthenticationComponents/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { Redirect } from "react-router-dom";
import { rmSync } from "fs";
const passwordRegex = new RegExp( //confirm if password is correct format
  "(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}"
);
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // intialising states
      Username: "",
      Password: "",
      ConfirmPassword: "",
      Redirect: false,
      ErrorMessage: ""
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
    //on submission of form below requirements
    if (
      this.state.Username != "" && //if fields are not empty and are filled in
      this.state.Password != "" &&
      this.state.ConfirmPassword != ""
    ) {
      if (this.state.Username.length >= 3) {
        //if username greater then or equal to 3 characters
        if (passwordRegex.test(this.state.Password)) {
          //password correct format
          if (this.state.Password === this.state.ConfirmPassword) {
            //confirm password matches password
            this.updatePassword(); //succesfully update the password
            this.setState({
              ErrorMessage: "" //no error
            });
          } else {
            //otherwise display following error messages
            this.setState({
              ErrorMessage: "Your passwords do not match"
            });
          }
        } else {
          this.setState({
            ErrorMessage: "Your password is in the incorrect format."
          });
        }
      } else {
        this.setState({
          ErrorMessage: "Your username must be atleast 3 characters long"
        });
      }
      //this.setState({ Redirect: true });
    } else {
      this.setState({ ErrorMessage: "One or more fields are empty" });
    }
    event.preventDefault();
  }
  updatePassword() {
    fetch("/api/ForgotPassword", {
      //connects to frontend to backend
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
          //response status
          // Successful login 200
          this.setState({ Redirect: true });
        } else if (res.status === 409) {
          this.setState({
            ErrorMessage: "The password could not be updated,please try again" //error
          });
        } else if (res.status === 401) {
          //response status
          this.setState({
            ErrorMessage: " This username is incorrect" //error
          });
        } else {
          console.log("Something unexpeceted went wrong ._.");
        }
      })
      .catch(exception => {
        console.log("Error:", exception);
      });
  }
  handlePasswordChange(event) {
    this.setState({ Password: event.target.value });
  }
  render() {
    if (this.state.Redirect == true) {
      return <Redirect to="/SignIn" />; // goes to Sign In Page
    }
    return (
      //layout of page with Containers, text input, forms, images  etc.
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
              <div className="ForgotPassworderrorMessage">
                {this.state.ErrorMessage}
              </div>
              <input className="SignInButton" type="submit" value="CONFIRM" />
            </form>
          </div>
          <SignInLink // Option back to Sign In Page
            message="Already have an account? Sign in here!"
            link="/SignIn"
          />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
