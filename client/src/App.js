import React from "react";
import { Router } from "react-router-dom";

import history from "./services/history";
import Routes from "./routes";

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;

//https://medium.com/javascript-in-plain-english/routing-and-navigation-in-react-cffc26e8a389
