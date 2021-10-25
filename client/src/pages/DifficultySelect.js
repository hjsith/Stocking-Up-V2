import React from "react";
import "../assets/css/Difficulty.scss";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Redirect: false,
      unauth: false,
    };
  }

  static contextType = UserContext;

  SetDifficulty(value) {
    fetch("/api/investor/difficulty", {
      //connects to frotnend to backend
      method: "PATCH",
      body: JSON.stringify({
        id: this.context.user.id,
        difficulty: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          this.setState({ Redirect: true });
        } else if (res.status === 401) {
          this.setState({ unauth: true });
        }
      })
      .catch((exception) => {
        console.log("Error:", exception);
      });
  }

  render() {
    if (this.state.Redirect == true) {
      return <Redirect to="/Profile" />;
    }

    //Redirect if the user is not logged in
    if (this.state.unauth || this.context.user.name === "") {
      return (
        <Redirect
          to={{
            pathname: "/SignIn",
          }}
        />
      );
    }

    return (
      <div className="Buttons">
        <table>
          <tbody>
            <tr>
              <td colspan="3" className="DifficultyHeading">
                Select your difficulty
              </td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={() => this.SetDifficulty("Easy")}
                  className="EasyButton"
                >
                  Easy
                </button>
              </td>
              <td>
                <button
                  onClick={() => this.SetDifficulty("Intermediate")}
                  className="InterButton"
                >
                  Intermediate
                </button>
              </td>
              <td>
                <button
                  onClick={() => this.SetDifficulty("Difficult")}
                  className="DifficultButton"
                >
                  Difficult
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SignIn;
