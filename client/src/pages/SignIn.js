import React from "react";
import "../assets/css/SignIn.scss";
import logo from "../assets/images/stocking-up.png";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: "", Password: "" };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ Username: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.Username + " " + this.state.Password);
    event.preventDefault();
  }

  handlePasswordChange(event) {
    this.setState({ Password: event.target.value });
  }
  render() {
    return (
      <div className="LoginContainer">
        <div className="Login">
          <img src={logo} width="114" height="114" className="Logo" />
          <div className="Welcome">Welcome!</div>
          <div className ="FormContainer">
            <form onSubmit={this.handleSubmit}>
            
               
                <input className="Usernametext"
                  type="text"
                  value={this.state.Username}
                  onChange={this.handleUsernameChange}
                  placeholder="Username"
                
                />
           
              <input className="Passwordtext"
                type="password"
                value={this.state.Password}
                onChange={this.handlePasswordChange}
                placeholder="Password"
              />

              <input className="SignInButton" type="submit" value="SIGN IN" />

            </form>
          </div>
          <div>
            <a href="/SignUp" className="NoAccount">
              {" "}
              Don't have an account? Sign up here!
            </a>
          </div>
          <div>
            <a href="/ForgotPassword" className="ForgotPassword">
              {" "}
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
