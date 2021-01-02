import axios from "axios";

import { ASSESSMENT_QUESTION } from "../utils/actionTypes";

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

export const addAssessmentQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_BEGIN });

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

export const fetchAllAssessmentQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_BEGIN });

  axios
    .get(
      `/api/user/assessment/question_bank/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_SUCCESS,
          payload: res.data,
        });
      }, 3000);
    })
    .catch((err) => {
      console.log("Fetch question to assessment failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({
        type: ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_FAIL,
      });
    });
};

export const updateAllAssessmentQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_BEGIN });

  axios
    .post(
      `/api/user/assessment/questions/update/${data.assessmentID}`,
      data.questions,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_SUCCESS,
          payload: res.data,
        });
      }, 500);
    })
    .catch((err) => {
      console.log("update assessment question failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({
        type: ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_FAIL,
      });
    });
};

export const addToQuestionBank = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_BEGIN });

  axios
    .post(
      `/api/user/assessment/questions/add/question_bank/${data.assessmentID}/${data.questionID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_SUCCESS,
        });
      }, 500);
    })
    .catch((err) => {
      console.log("update unsuccessful", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({
        type: ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_FAIL,
      });
    });
};
