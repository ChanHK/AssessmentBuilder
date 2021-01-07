import axios from "axios";
import { CANDIDATE } from "../utils/actionTypes";

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
