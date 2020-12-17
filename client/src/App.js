import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import history from "./services/history";
import Routes from "./routes";
import store from "./config/store";
import { logout } from "./actions/auth.actions";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  console.log("from App.js", token);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logout());

    this.props.history.push("/login");
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;

//https://medium.com/javascript-in-plain-english/routing-and-navigation-in-react-cffc26e8a389
