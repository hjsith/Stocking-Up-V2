import "./assets/css/App.scss";
import UserProfileIcon from "./components/UserProfileIcon";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <UserProfileIcon name="Vishaal Kumar" />
      <UserProfileIcon name="Hasith Jayasekera" />
      <UserProfileIcon name="Jasmin Narisetty" />
      <UserProfileIcon name="Sanya Dua" />
      <UserProfileIcon name="Aiswaryalakshmi Rajeev" />
      <UserProfileIcon name="James Lee" />
      <UserProfileIcon name="Gemly" />
    </>
  );
}

export default App;
