import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/UpdatePassword.scss";
import Logo from "../assets/images/stocking-up.png";
import { Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const passwordRegex = new RegExp(
  "(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}"
);

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, //Used to tell the component whether or not to redirect back to the profile page
      unauth: false,
      user: {},
    };
  }

  static contextType = UserContext;

  fetchUser() {
    window.setTimeout(() => {
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
    }, 1 * 1000);
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
          <div className="PasswordChangeContainer">
            <img src={Logo} className="Logo" alt="Stocking Up Logo" />
            <div className="PasswordTitle">Update Your Profile?</div>
            <div className="FormContainer">
              <form onSubmit={this.handleSubmit} className="PasswordUpdateForm">
                <label className="FormLabel">Change your First Name? </label>
                <div>
                  <input
                    className="inputTextfield"
                    type="Text"
                    value={this.state.PasswordToConfirm}
                    onChange={this.handlePasswordConfirm}
                    placeholder={this.state.user.InvestorFName}
                  />
                </div>
                <input
                  className="UpdateButton"
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
