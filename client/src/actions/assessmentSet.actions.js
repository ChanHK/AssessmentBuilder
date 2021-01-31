import axios from "axios";

import { ASSESSMENT_SET } from "../utils/actionTypes";

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

export const fetchQuestionsSet = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_SET.FETCH_SET_QUESTIONS_BEGIN });

  axios
    .get(
      `/api/user/assessment/sets/fetch/${data.setNum}/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_SET.FETCH_SET_QUESTIONS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: ASSESSMENT_SET.FETCH_SET_QUESTIONS_FAIL });
    });
};
