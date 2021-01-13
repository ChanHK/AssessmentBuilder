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

export const fetchProfilePic = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_USER_PROFILE_PIC_BEGIN });

  axios
    .get("/api/user/home/profile/fetch/image", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_USER_PROFILE_PIC_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_USER_PROFILE_PIC_FAIL });
    });
};

export const deleteAssessment = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.DELETE_ASSESSMENT_BEGIN });

  axios
    .post(
      `/api/user/home/assessment/delete/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.DELETE_ASSESSMENT_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("delete failed", err);
      dispatch({ type: HOME.DELETE_ASSESSMENT_FAIL });
    });
};

export const fetchDesQuestions = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/descriptive_questions/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_FAIL });
    });
};
