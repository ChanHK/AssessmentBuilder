import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import history from "./services/history";
import Routes from "./routes";
import store from "./config/store";

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
