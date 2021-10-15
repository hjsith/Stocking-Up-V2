import React from "react";
import NavBar from "../components/NavBar";
import UserProfileIcon from "../components/UserProfileIcon";
import { UserContext } from "../components/UserContext";
class temp extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick() {
    if (this.context.user.name == "James") {
      this.context.updateUser({
        name: "Sanya",
        id: "123"
      });
    } else {
      this.context.updateUser({
        name: "James",
        id: "1290"
      });
    }
  }
  static contextType = UserContext;
  render() {
    console.log(this.context.user);
    return (
      <>
        <NavBar />
        <h1>HOME PAGE!</h1>
        <UserProfileIcon
          name="Hjsith"
          colorNumber={1}
          company={false}
          size={150}
        />
        <UserProfileIcon
          name="Hjsith"
          colorNumber={4}
          company={false}
          size={120}
        />
        <UserProfileIcon
          name="Hjsith"
          colorNumber={2}
          company={false}
          size={10}
        />
        <UserProfileIcon
          name="Hjsith"
          colorNumber={3}
          company={false}
          size={50}
        />

        <button onClick={this.buttonClick}>Hello</button>
      </>
    );
  }
}

export default temp;
