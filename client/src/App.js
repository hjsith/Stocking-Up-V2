import "./assets/css/App.scss";
import React from "react";
import Profile from "./pages/Profile";
import temp from "./pages/temp";
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
          <Route path="/temp" component={temp} />
          <Route exact path="/">
            <Redirect to="/temp" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
