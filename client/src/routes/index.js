import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./Route";

import {
  LoginContainer,
  ForgotPasswordContainer,
  ResetPasswordContainer,
} from "../pages/Login";

import RegisterContainer from "../pages/Register";

import HomeContainer from "../pages/Home";
import { ProfileContainer, EditProfileContainer } from "../pages/Profile";

import {
  QuestionBankContainer,
  CreateQuestionContainer,
  EditQuestionContainer,
  ViewQuestionContainer,
} from "../pages/QuestionBank";

import {
  GradeContainer,
  StatisticsContainer,
  ResultsContainer,
  ViewResponseContainer,
  CreateAssessmentContainer,
  DescriptiveResponsesContainer,
} from "../pages/Assessment";

import { StartingPageContainer } from "../pages/StartAssessment";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RegisterContainer} />
        <Route path="/login" exact component={LoginContainer} />
        <Route
          path="/forgotPassword"
          exact
          component={ForgotPasswordContainer}
        />
        <Route
          path="/resetPassword/:token"
          exact
          component={ResetPasswordContainer}
        />

        <Route path="/home" exact component={HomeContainer} isPrivate />
        <Route path="/profile" exact component={ProfileContainer} isPrivate />
        <Route
          path="/profile/edit"
          exact
          component={EditProfileContainer}
          isPrivate
        />

        <Route
          path="/questionbank"
          exact
          component={QuestionBankContainer}
          isPrivate
        />
        <Route
          path="/questionbank/question/:type/:questionID"
          exact
          component={CreateQuestionContainer}
          isPrivate
        />
        <Route
          path="/questionbank/editQuestion"
          exact
          component={EditQuestionContainer}
          isPrivate
        />
        <Route
          path="/questionbank/question_view/:questionID"
          exact
          component={ViewQuestionContainer}
          isPrivate
        />

        <Route
          path="/assessment/gradeResponses"
          exact
          component={GradeContainer}
          isPrivate
        />
        <Route
          path="/assessment/descriptiveResponses"
          exact
          component={DescriptiveResponsesContainer}
          isPrivate
        />
        <Route
          path="/assessment/statistics"
          exact
          component={StatisticsContainer}
          isPrivate
        />
        <Route
          path="/assessment/results"
          exact
          component={ResultsContainer}
          isPrivate
        />
        <Route
          path="/assessment/response"
          exact
          component={ViewResponseContainer}
          isPrivate
        />
        <Route
          path="/assessment/createAssessment"
          exact
          component={CreateAssessmentContainer}
          isPrivate
        />

        <Route
          path="/startAssessment/startingPage"
          exact
          component={StartingPageContainer}
          isPrivate
        />

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={RegisterContainer} />
      </Switch>
    </Router>
  );
}
