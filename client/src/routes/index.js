import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./Route";

import {
  LoginContainer,
  ForgotPasswordContainer,
  ResetPasswordContainer,
} from "../pages/Login";

import RegisterContainer from "../pages/Register";

import {
  HomeContainer,
  DescriptiveResponsesContainer,
  ResultsContainer,
  StatisticsContainer,
  ViewResponseContainer,
  GradeContainer,
  ActivationContainer,
  AssessmentsContainer,
} from "../pages/Home";

import { ProfileContainer, EditProfileContainer } from "../pages/Profile";

import {
  QuestionBankContainer,
  CreateQuestionContainer,
  ViewQuestionContainer,
  QBSubjectsContainer,
} from "../pages/QuestionBank";

import {
  CreateAssessmentContainer,
  RetrieveQuestionBankContainer,
  CreateEditQuestionContainer,
} from "../pages/Assessment";

import { StartingPageContainer, AttemptContainer } from "../pages/Candidate";

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

        <Route
          path="/home"
          exact
          component={HomeContainer}
          isPrivate
          role={"User"}
        />

        <Route
          path="/assessment/:subject"
          exact
          component={AssessmentsContainer}
          isPrivate
          role={"User"}
        />

        <Route
          path="/profile"
          exact
          component={ProfileContainer}
          isPrivate
          role={"User"}
        />

        <Route
          path="/profile/edit"
          exact
          component={EditProfileContainer}
          isPrivate
          role={"User"}
        />

        <Route
          path="/questionbank/main"
          exact
          component={QBSubjectsContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/questionbank/:subject"
          exact
          component={QuestionBankContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/questionbank/question/:type(edit|create)/:questionID/:subject"
          exact
          component={CreateQuestionContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/questionbank/question_view/:questionID/:subject"
          exact
          component={ViewQuestionContainer}
          isPrivate
          role={"User"}
        />

        <Route
          path="/assessment/grade/responses/:questionID/:assessmentID"
          exact
          component={GradeContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/descriptive/responses/:assessmentID"
          exact
          component={DescriptiveResponsesContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/statistics/:assessmentID"
          exact
          component={StatisticsContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/activation/:assessmentID"
          exact
          component={ActivationContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/results/:assessmentID"
          exact
          component={ResultsContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/response/:candID/:assessmentID"
          exact
          component={ViewResponseContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/:type(edit|create|view)/:selected(settings|questions|set|access|timer)/:assessmentID"
          exact
          component={CreateAssessmentContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/question_bank/:section/:type(edit|create)/:assessmentID"
          exact
          component={RetrieveQuestionBankContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/update_question/:section/:type(edit|create)/:type2(edit|create)/:assessmentID/:questionID"
          exact
          component={CreateEditQuestionContainer}
          isPrivate
          role={"User"}
        />
        <Route
          path="/assessment/start/:assessmentID"
          exact
          component={StartingPageContainer}
          isPrivate
          role={"Candidate"}
        />
        <Route
          path="/assessment/attempt/:set/:type(1|2|3|4)/:timeSettings(1|2|3)/:totalSec/:assessmentID"
          exact
          component={AttemptContainer}
          isPrivate
          role={"Candidate"}
        />

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={RegisterContainer} />
      </Switch>
    </Router>
  );
}
