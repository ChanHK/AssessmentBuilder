import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import history from "./services/history";
import Routes from "./routes";
import store from "./config/store";
import { loadUser } from "./actions/auth.actions";

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

