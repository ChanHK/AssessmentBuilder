import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const logged = localStorage.getItem("token") ? true : false;
  // console.log(localStorage.getItem("token"));
  // console.log(logged);

  // if user have not logged in, direct to register page
  if (isPrivate && !logged) {
    return <Redirect to="/" />;
  }

  // direct user to home if the user wants to go back to register/ log in page after authentication
  if (!isPrivate && logged) {
    return <Redirect to="/home" />;
  }

  // else the user can go anywhere they want
  return <Route {...rest} component={Component} />;
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default RouteWrapper;
