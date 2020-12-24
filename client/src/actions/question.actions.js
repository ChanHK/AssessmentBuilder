import axios from "axios";

import { QUESTION } from "../utils/actionTypes";

import { returnSucMsg } from "./sucMsg.actions";
// import { returnErrors } from "./error.actions";

export const updateQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_BEGIN });

  const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) config.headers["x-auth-token"] = token;

    return config;
  };

  axios
    .post("/api/user/question", data, tokenConfig(getState))
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
      setTimeout(() => {
        dispatch({
          type: QUESTION.UPDATE_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 5000);
    })
    .catch((err) => {
      console.log("Update question data failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_FAIL });
    });
};

export const fetchAllQuestionData = () => (dispatch, getState) => {
  dispatch({ type: QUESTION.FETCH_ALL_QUESTION_DATA_BEGIN });

  const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) config.headers["x-auth-token"] = token;

    return config;
  };

  axios
    .get("/api/user/question", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.FETCH_ALL_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Fetch question data failed", err);
      dispatch({ type: QUESTION.FETCH_ALL_QUESTION_DATA_FAIL });
    });
};
