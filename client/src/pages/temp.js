import React from "react";
import NavBar from "../components/NavBar";
import UserProfileIcon from "../components/UserProfileIcon";
class temp extends React.Component {
  render() {
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
      </>
    );
  }
}

export default temp;
