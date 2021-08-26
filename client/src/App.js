import "./assets/css/App.scss";
import UserProfileIcon from "./components/UserProfileIcon";
import NavBar from "./components/NavBar";
import PortfolioPage from "./components/PortfolioPage";

function App() {
  return (
    <>
      <NavBar />
      {/* <UserProfileIcon name="Vishaal Kumar" /> */}
      <PortfolioPage />
    </>
  );
}

export default App;
