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
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
