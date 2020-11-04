import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./Route";

import LoginContainer from "../pages/Login";
import RegisterContainer from "../pages/Register";

// import Dashboard from "../pages/Dashboard";

import HomeContainer from "../pages/Home";
import { ProfileContainer, EditProfileContainer } from "../pages/Profile";
// import CandidateContainer from "../pages/Candidate";
// import QuestionBankContainer from "../pages/QuestionBank";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RegisterContainer} />
        <Route path="/login" component={LoginContainer} />

        {/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}

        <Route path="/home" component={HomeContainer} />
        <Route path="/profile" exact component={ProfileContainer} />
        <Route path="/profile/edit" exact component={EditProfileContainer} />


        {/* <Route path="/candidate" component={CandidateContainer} />
        <Route path="/questionbank" component={QuestionBankContainer} /> */}

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={RegisterContainer} />
      </Switch>
    </Router>
  );
}
