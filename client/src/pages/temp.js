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
        id: "123",
      });
    } else {
      this.context.updateUser({
        name: "James",
        id: "1290",
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
        <UserProfileIcon name="Hjsith" company={false} size={150} />
        <UserProfileIcon name="Hjsith" company={false} size={150} />
        <UserProfileIcon name="Hjsith" company={false} size={150} />
        <UserProfileIcon name="James" company={false} size={120} />
        <UserProfileIcon name="James" company={false} size={120} />
        <UserProfileIcon name="WiseTech" company={false} size={120} />
        <UserProfileIcon name="A2M" company={false} size={10} />
        <UserProfileIcon name="A2M" company={false} size={10} />
        <UserProfileIcon name="A2M" company={false} size={10} />

        <UserProfileIcon name="Aiswarya" company={false} size={50} />
        <UserProfileIcon name="Aiswaryalakshmi" company={false} size={50} />

        <button onClick={this.buttonClick}>Hello</button>
      </>
    );
  }
}

export default temp;
