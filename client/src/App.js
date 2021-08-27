import "./assets/css/App.scss";
import React from "react";
import Profile from "./pages/Profile";
import temp from "./pages/temp";
import SignIn from "./pages/SignIn";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Profile" component={Profile} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/temp" component={temp} />
          <Route exact path="/">
            <Redirect to="/SignIn" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
