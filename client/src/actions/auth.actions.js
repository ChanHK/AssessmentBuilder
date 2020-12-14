import axios from "axios";

import { returnErrors } from "./error.actions";
import { returnSucMsg } from "./sucMsg.actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../utils/actionTypes";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// register user
export const register = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/auth/register", data, config)
    .then((res) =>
      dispatch({
        type: REGISTER.REQISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER.REQISTER_FAIL,
      });
    });
};

// setup config/headers $ token
export const tokenConfig = (getState) => {
  // get token from localstorage
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) config.headers["x-auth-token"] = token;

  return config;
};

// logout
export const logout = () => (dispatch) => {
  console.log("logout");
  dispatch({
    type: LOGOUT.LOGOUT_SUCCESS,
  });
};

// login user
export const login = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/auth/login", data, config)
    .then((res) =>
      dispatch({
        type: LOGIN.LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN.LOGIN_FAIL,
      });
    });
};

//forgot password
export const forgotPassword = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .put("api/auth/forgotPassword", data, config)
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
