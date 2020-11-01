import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./Route";

// import SignInContainer from "../pages/SignIn";
// import SignUpContainer from "../pages/SignUp";

// import Dashboard from "../pages/Dashboard";

// import HomeContainer from "../pages/Home";
// import CandidateContainer from "../pages/Candidate";
// import QuestionBankContainer from "../pages/QuestionBank";

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component={SignInContainer} />
        <Route path="/register" component={SignUpContainer} />

        <Route path="/dashboard" component={Dashboard} isPrivate />

        <Route path="/home" component={HomeContainer} />
        <Route path="/candidate" component={CandidateContainer} />
        <Route path="/questionbank" component={QuestionBankContainer} /> */}

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        {/* <Route component={SignInContainer} /> */}
      </Switch>
    </Router>
  );
}
