import "./assets/css/App.scss";
import React from "react";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "./pages/Profile";
import CompanySearch from "./pages/CompanySearch";
import SignIn from "./pages/SignIn";
import temp from "./pages/temp";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import QuoteManagement from "./pages/QuoteManagement";
import Portfolio from "./pages/Portfolio";
import DiscussionBoard from "./pages/DiscussionBoard";
import DiscussionBoardSearch from "./pages/DiscussionBoardSearch";
import Newsfeed from "./pages/Newsfeed";
import { UserContext } from "./components/UserContext";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

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
            <Route path="/SignIn" component={SignIn} />
            <Route path="/temp" component={temp} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/Newsfeed" component={Newsfeed} />

            <Route path="/Portfolio" component={Portfolio} />
            <Route path="/Profile" render={(props) => <Profile {...props} />} />
            <Route path="/UpdatePassword" component={UpdatePassword} />
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
