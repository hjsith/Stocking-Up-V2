import React from "react"; //imports required
import "../assets/css/SignIn.scss";
import lock from "../assets/images/lock.png";
import letter from "../assets/images/letter.png";
import SignInLogo from "../components/UserAuthenticationComponents/SignInLogo";
import SignInLink from "../components/UserAuthenticationComponents/SignInLink";
import AuthenticationTitle from "../components/UserAuthenticationComponents/AuthenticationTitle";
import profile from "../assets/images/profile.png";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";
const passwordRegex = new RegExp( //confirm if password is correct format
  "(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}"
);
const emailRegex = new RegExp("[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+"); //email validation

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Username: "",
      Password: "",
      Email: "",
      ConfirmPassword: "",
      Redirect: false,
      errorMessage: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextType = UserContext;

  handleFirstNameChange(event) {
    this.setState({ FirstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ LastName: event.target.value });
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
      this.state.FirstName != "" && //all fields are entered with something
      this.state.LastName != "" &&
      this.state.Username != "" &&
      this.state.Password != "" &&
      this.state.Email != "" &&
      this.state.ConfirmPassword != ""
    ) {
      if (emailRegex.test(this.state.Email)) {
        // email in correct format
        this.setState({ errorMessage: "" }); //no error message
        if (passwordRegex.test(this.state.Password)) {
          //password in correct format

          if (this.state.Username.length >= 3) {
            //username 3 or more characters in length
            if (this.state.Password === this.state.ConfirmPassword) {
              //password and confirmed password match
              this.createInvestor(); // if all above is done correctly then create an investor
            } else {
              this.setState({
                // if below fields entered incorrectly display following errors
                errorMessage: "Your passwords do not match"
              });
            }
          } else {
            this.setState({
              errorMessage: "Your username must be atleast 3 characters long"
            });
          }
        } else {
          this.setState({
            errorMessage:
              "This password is in the incorrect format, it must contain atleast 8 characters, 1 upper case, 1 number and 1 special character. "
          });
        }
      } else {
        this.setState({
          errorMessage: " The email is not in the correct format"
        });
      }
    } else {
      this.setState({
        errorMessage: "One or more fields are empty, please try again"
      });
    }
    event.preventDefault();
  }

  createInvestor() {
    fetch("/api/SignUp", {
      //connects to frontend to backend
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        email: this.state.Email,
        password: this.state.Password,
        username: this.state.Username
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 201) {
          //response status
          // Successful login 200
          res.json().then(body => {
            this.context.updateUser({ name: body.username, id: body.id });
          });

          this.setState({ Redirect: true });
        } else if (res.status === 422) {
          //response status
          this.setState({
            errorMessage: "This username already exists" //error message displayed
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
      return <Redirect to="/Profile" />; //page redirected to after completion correctly
    }
    return (
      // layout of page with Containers, text input, forms, images  etc.
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
                  value={this.state.FirstName}
                  onChange={this.handleFirstNameChange}
                  placeholder="First Name"
                />
                <img src={profile} className="profile" />
                <div>
                  {" "}
                  <input
                    className="SignUpInput"
                    type="text"
                    value={this.state.LastName}
                    onChange={this.handleLastNameChange}
                    placeholder="Last Name"
                  />
                  <img src={profile} className="profile" />
                </div>
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
                <div className="SignUperrorMessage">
                  {this.state.errorMessage}
                </div>
                <input className="SignInButton" type="submit" value="SIGN UP" />
              </div>
            </form>
          </div>
          <SignInLink //link back to Sign In page
            message="Already have an account? Sign in here!"
            link="/SignIn"
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
