import axios from "axios";
import { CANDIDATE } from "../utils/actionTypes";
import { returnErrors } from "./error.actions";

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

export const fetchAssessmentSetForCandidate = (data) => (
  dispatch,
  getState
) => {
  dispatch({ type: CANDIDATE.FETCH_ASSESSMENT_SET_CANDIDATE_BEGIN });

  axios
    .get(
      `/api/candidate/attempt/assessment/fetch/set/${data.set}/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: CANDIDATE.FETCH_ASSESSMENT_SET_CANDIDATE_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: CANDIDATE.FETCH_ASSESSMENT_SET_CANDIDATE_FAIL });
    });
};
