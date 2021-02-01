import axios from "axios";
import { CANDIDATE } from "../utils/actionTypes";
import { returnErrors } from "./error.actions";

const tokenConfig = (getState) => {
  const token = getState().candidateReducer.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) config.headers["x-auth-token"] = token;

  return config;
};

export const fetchAssessmentInfo = (data) => (dispatch, getState) => {
  dispatch({ type: CANDIDATE.FETCH_ASSESSMENT_START_INFO_BEGIN });

  axios
    .get(
      `/api/candidate/start/assessment/fetch/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: CANDIDATE.FETCH_ASSESSMENT_START_INFO_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: CANDIDATE.FETCH_ASSESSMENT_START_INFO_FAIL });
    });
};

export const candidateRegister = (data) => (dispatch) => {
  dispatch({ type: CANDIDATE.CANDIDATE_REQ_WITH_AC_BEGIN });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(
      `/api/candidate/start/assessment/register/with_auth/${data.assessmentID}`,
      data,
      config
    )
    .then((res) =>
      dispatch({
        type: CANDIDATE.CANDIDATE_REQ_WITH_AC_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CANDIDATE.CANDIDATE_REQ_WITH_AC_FAIL,
      });
    });
};

export const candidateRegister2 = (data) => (dispatch) => {
  dispatch({ type: CANDIDATE.CANDIDATE_REQ_WITHOUT_AC_BEGIN });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(
      `/api/candidate/start/assessment/register/without_auth/${data.assessmentID}`,
      data,
      config
    )
    .then((res) =>
      dispatch({
        type: CANDIDATE.CANDIDATE_REQ_WITHOUT_AC_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CANDIDATE.CANDIDATE_REQ_WITHOUT_AC_FAIL,
      });
    });
};

export const fetchAllQuestionForCandidate = (data) => (dispatch, getState) => {
  dispatch({ type: CANDIDATE.FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_BEGIN });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get(
      `/api/candidate/attempt/assessment/fetch/all_questions/${data.assessmentID}`,
      config
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: CANDIDATE.FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({
        type: CANDIDATE.FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_FAIL,
      });
    });
};

export const uploadCandidateResponses = (data) => (dispatch, getState) => {
  dispatch({ type: CANDIDATE.UPLOAD_CANDIDATE_RESPONSE_BEGIN });

  axios
    .post(
      `/api/candidate/attempt/assessment/submit/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: CANDIDATE.UPLOAD_CANDIDATE_RESPONSE_SUCCESS,
      })
    )
    .catch((err) => {
      dispatch({
        type: CANDIDATE.UPLOAD_CANDIDATE_RESPONSE_FAIL,
      });
    });
};

export const fetchGrades = (data) => (dispatch, getState) => {
  dispatch({ type: CANDIDATE.FETCH_GRADES_BEGIN });

  axios
    .get(
      `/api/candidate/assessment/fetch/grades/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: CANDIDATE.FETCH_GRADES_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: CANDIDATE.FETCH_GRADES_FAIL });
    });
};
