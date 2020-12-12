import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

import history from "./services/history";
import Routes from "./routes";
import store from "./config/store";
import { loadUser } from "./actions/auth.actions";

import { logout } from "./actions/auth.actions";

// Check for token to keep user logged in
if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");

  const decoded = jwt_decode(token);

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "./login";
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
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
