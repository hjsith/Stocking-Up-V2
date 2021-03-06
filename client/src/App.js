import "./assets/css/App.scss";
import React from "react";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "./pages/Profile";
import CompanySearch from "./pages/CompanySearch";
import SignIn from "./pages/SignIn";
import temp from "./pages/temp";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import DifficultySelect from "./pages/DifficultySelect";
import QuoteManagement from "./pages/QuoteManagement";
import Portfolio from "./pages/Portfolio";
import Friends from "./pages/Friends";
import AllOrders from "./pages/AllOrders";
import MarketsOverview from "./pages/MarketsOverview";
import DiscussionBoard from "./pages/DiscussionBoard";
import DiscussionBoardSearch from "./pages/DiscussionBoardSearch";
import Newsfeed from "./pages/Newsfeed";
import EditProfile from "./pages/EditProfile";
import { UserContext } from "./components/UserContext";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";

class App extends React.Component {
  //refresh remembering details of user
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(window.localStorage.getItem("user")) ?? {
        name: "",
        id: "",
      },
      updateUser: (newUser) => {
        this.setState({ user: newUser });
        window.localStorage.setItem("user", JSON.stringify(newUser));
      },
    };
  }

  render() {
    return (
      <Router>
        <UserContext.Provider value={this.state}>
          <Switch>
            <Route path="/QuoteManagement" component={QuoteManagement} />
            <Route path="/CompanySearch" component={CompanySearch} />
            <Route path="/Leaderboard" component={Leaderboard} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/temp" component={temp} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/DifficultySelect" component={DifficultySelect} />
            <Route path="/Portfolio" component={Portfolio} />
            <Route path="/Profile" render={(props) => <Profile {...props} />} />
            <Route path="/Friends" component={Friends} />
            <Route path="/UpdatePassword" component={UpdatePassword} />
            <Route path="/AllOrders" component={AllOrders} />
            <Route path="/Newsfeed" component={Newsfeed} />
            <Route path="/MarketsOverview" component={MarketsOverview} />
            <Route path="/EditProfile" component={EditProfile} />
            <Route
              path="/DiscussionBoardSearch"
              component={DiscussionBoardSearch}
            />
            <Route path="/DiscussionBoard/:id" component={DiscussionBoard} />
            <Route exact path="/">
              <Redirect to="/SignIn" />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
