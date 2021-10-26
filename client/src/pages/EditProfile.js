import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/UpdatePassword.scss";
import Logo from "../assets/images/stocking-up.png";
import { Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const emailRegex = new RegExp("[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+"); //email validation

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, //Used to tell the component whether or not to redirect back to the profile page
      unauth: false,
      user: {},
      FirstName: "",
      LastName: "",
      Email: "",
      errorMessage: "",
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  static contextType = UserContext;

  handleFirstNameChange(event) {
    //handles input changes
    this.setState({ FirstName: event.target.value });
  }

  handleLastNameChange(event) {
    //handles input changes
    this.setState({ LastName: event.target.value });
  }

  handleEmailChange(event) {
    //handles input changes
    this.setState({ Email: event.target.value });
  }

  fetchUser() {
    fetch("/api/investor?id=" + this.context.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) =>
          this.setState({
            user: body,
          })
        );
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  postDetails() {
    fetch("/api/investor/updateUser", {
      method: "PUT",
      body: JSON.stringify({
        investorID: this.context.user.id,
        firstname:
          this.state.FirstName == ""
            ? this.state.user.InvestorFName
            : this.state.FirstName,
        lastname:
          this.state.LastName == ""
            ? this.state.user.InvestorLName
            : this.state.LastName,
        email:
          this.state.Email == ""
            ? this.state.user.InvestorEmail
            : this.state.Email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          redirect: true,
        });
      } else if (res.status === 401) {
        this.setState({ unauth: true });
      } else {
        console.log(res.status);
      }
    });
  }

  updateUser(event) {
    if (this.state.Email != "") {
      if (!emailRegex.test(this.state.Email)) {
        this.setState({
          errorMessage: " The email is not in the correct format",
        });
      } else {
        this.postDetails();
      }
    } else {
      this.postDetails();
    }
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    //If the password was successfully updated, redirect back to the profile page
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/Profile",
            state: {
              snackBarMessage: "Profile has been successfully updated!",
            },
          }}
        />
      );
    }

    //Redirect unauthenticated user back to the SignIn page
    if (
      this.context.user.name == "" ||
      this.context.user.id == "" ||
      this.state.unauth
    ) {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }

    return (
      <>
        <NavBar />
        <div className="PageContainer">
          <div className="EditProfileContainer">
            <img src={Logo} className="Logo" alt="Stocking Up Logo" />
            <div className="PasswordTitle">Update Your Profile?</div>
            <div className="FormContainer">
              <form onSubmit={this.updateUser} className="PasswordUpdateForm">
                <label className="FormLabel">Change your First Name? </label>
                <div>
                  <input
                    className="inputTextfield"
                    type="Text"
                    value={this.state.FirstName}
                    onChange={this.handleFirstNameChange}
                    placeholder={this.state.user.InvestorFName}
                  />
                </div>
                <label className="FormLabel">Change your Last Name? </label>
                <div>
                  <input
                    className="inputTextfield"
                    type="Text"
                    value={this.state.LastName}
                    onChange={this.handleLastNameChange}
                    placeholder={this.state.user.InvestorLName}
                  />
                </div>
                <label className="FormLabel">Change your Email? </label>
                <div>
                  <input
                    className="inputTextfield"
                    type="Text"
                    value={this.state.Email}
                    onChange={this.handleEmailChange}
                    placeholder={this.state.user.InvestorEmail}
                  />
                </div>
                <div className="EditProfielErrorMessage">
                  {this.state.errorMessage}
                </div>
                <input
                  className="UpdateProfileButton"
                  type="submit"
                  value="Update Profile"
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditProfile;
