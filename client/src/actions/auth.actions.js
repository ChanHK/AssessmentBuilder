import axios from "axios";

import { returnErrors } from "./error.actions";
import { returnSucMsg } from "./sucMsg.actions";

import { LOGIN, LOGOUT, REGISTER } from "../utils/actionTypes";

// register user
export const register = (data) => (dispatch) => {
  dispatch({ type: REGISTER.REGISTER_BEGIN });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/auth/register", data, config)
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

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT.LOGOUT_SUCCESS,
  });
};

// login user
export const login = (data) => (dispatch) => {
  dispatch({ type: LOGIN.LOGIN_BEGIN });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/auth/login", data, config)
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
    .put("/api/auth/forgotPassword", data, config)
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//reset password
export const resetPassword = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .put("/api/auth/resetPassword", data, config)
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
