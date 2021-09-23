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
import { UserContext } from "./components/UserContext";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "" }
    };
  }
  updateUser(username) {
    this.setState({ user: { name: username } }); //remember who logs in
  }
  logout() {
    this.setState({ user: {} });
  }
  render() {
    const value = {
      user: this.state.user,
      updateUser: this.updateUser,
      logoutUser: this.logout
    };
    return (
      <Router>
        {/* <userContext.Provider value={value}> */}
        <Switch>
          <Route path="/QuoteManagement" component={QuoteManagement} />
          <Route path="/CompanySearch" component={CompanySearch} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/temp" component={temp} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/ForgotPassword" component={ForgotPassword} />

          <Route path="/Portfolio" component={Portfolio} />
          <Route path="/Profile" render={props => <Profile {...props} />} />

          <Route path="/UpdatePassword" component={UpdatePassword} />
          <Route exact path="/">
            <Redirect to="/SignIn" />
          </Route>
        </Switch>
        {/* </userContext.Provider> */}
      </Router>
    );
  }
}

export default App;
