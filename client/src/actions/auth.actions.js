import axios from "axios";

import { returnErrors } from "./error.actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REQISTER_SUCCESS,
  REQISTER_FAIL,
} from "../utils/actionTypes";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  // get token from localstorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios.get("/api/user/user", tokenConfig(getState)).then((res) =>
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    })
  );
};

// register user
export const register = (data) => (dispatch) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // request body
  // const body = JSON.stringify({ data });

  axios
    .post("api/user/register", data, config)
    .then((res) =>
      dispatch({
        type: REQISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REQISTER_FAIL,
      });
    });
};

// setup config/headers $ token
export const tokenConfig = (getState) => {
  // get token from localstorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// login user
export const login = (data) => (dispatch) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/user/login", data, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
