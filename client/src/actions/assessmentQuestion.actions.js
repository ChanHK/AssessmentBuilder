import axios from "axios";

import { ASSESSMENT_QUESTION } from "../utils/actionTypes";

export const addAssessmentQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_BEGIN });
  console.log(data);
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
    .post(
      `/api/user/assessment/question_bank/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_SUCCESS,
          payload: res.data,
        });
      }, 500);
    })
    .catch((err) => {
      console.log("Add question to assessment failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_FAIL });
    });
};
