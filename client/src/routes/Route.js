import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import store from "../config/store";

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const signed =
    store.getState().auth.isAuthenticated === null
      ? false
      : store.getState().auth.isAuthenticated;

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && signed) {
    return <Redirect to="/home" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default RouteWrapper;
