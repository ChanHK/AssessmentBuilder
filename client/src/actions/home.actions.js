import axios from "axios";
import { HOME } from "../utils/actionTypes";

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

export const homeFetchAllAssessment = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.HOME_FETCH_ALL_ASSESSMENTS_BEGIN });

  axios
    .get("/api/user/home/assessment/fetch", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.HOME_FETCH_ALL_ASSESSMENTS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.HOME_FETCH_ALL_ASSESSMENTS_FAIL });
    });
};

export const createAssessmentObj = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.CREATE_ASSESSMENT_OBJ_BEGIN });

  axios
    .post("/api/user/home/assessment/create", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.CREATE_ASSESSMENT_OBJ_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Create failed", err);
      dispatch({ type: HOME.CREATE_ASSESSMENT_OBJ_FAIL });
    });
};
