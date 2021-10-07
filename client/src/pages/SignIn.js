import React from "react"; //imports required
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import SignInLogo from "../components/UserAuthenticationComponents/SignInLogo";
import SignInLink from "../components/UserAuthenticationComponents/SignInLink";
import AuthenticationTitle from "../components/UserAuthenticationComponents/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";

class SignIn extends React.Component {
  constructor(props) {
    super(props);          //intialising  states 
    this.state = {
      Username: "",
      Password: "",
      Redirect: false,
      ErrorMessage: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);            //handle input changes 
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextType = UserContext;
  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.Username != "" && this.state.Password != "") {
      //if username and password are not empty then only proceed
      this.LoginInvestor();
    } else {
      this.setState({
        //otherwise display error message
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
          res.json().then(body => {
            this.context.updateUser({
              name: body.username,
              id: body.id
            });
            this.setState({ Redirect: true });
          });
        } else if (res.status === 401) {
          //response status
          this.setState({
            ErrorMessage: " This username or password is incorrect" //error message that is displayed
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
      return <Redirect to="/Profile" />; //page redirected after completion correctly
    }
    return (
      //layout of page with Containers, text input, forms, images  etc.
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
          <SignInLink //option back to Sign In page
            message="Don't have an account? Sign up here!"
            link="/SignUp"
          />

          <SignInLink //option back to Forgot Password Page
            message=" Forgot your password?"
            link="/ForgotPassword"
          />
        </div>
      </div>
    );
  }
}

export default SignIn;
