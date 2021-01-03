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

export const updateAssessmentSetQuestionID = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_BEGIN });

  axios
    .post(
      `/api/user/assessment/sets/question_ids/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_FAIL });
    });
};
