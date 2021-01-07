import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const RouteWrapper = ({ component: Component, isPrivate, role, ...rest }) => {
  const logged = localStorage.getItem("token") ? true : false;
  const userType = localStorage.getItem("role");
  // console.log(localStorage.getItem("token"));
  // console.log(logged);

  // if user have not logged in, direct to register page
  if (isPrivate && !logged) {
    return <Redirect to="/" />;
  }

  // direct user to home if the user wants to go back to register/ log in page after authentication
  if (!isPrivate && logged && userType === "User") {
    return <Redirect to="/home" />;
  }

  // else the user can go anywhere they want
  return <Route {...rest} component={Component} />;
  // if (userType === "User") {
  //   if (role === "User") return <Route {...rest} component={Component} />;
  //   else return <Redirect to="/home" />;
  // }

  // if (userType === "Candidate") {
  //   if (role === "Candidate") return <Route {...rest} component={Component} />;
  //   // else return // return error page
  // }
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
};

export default RouteWrapper;
