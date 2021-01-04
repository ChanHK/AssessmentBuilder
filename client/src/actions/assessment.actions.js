import axios from "axios";
import { ASSESSMENT } from "../utils/actionTypes";

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

export const updateAssessmentSetting = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_BEGIN });

  axios
    .post(
      `/api/user/assessment/settings/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Update assessment settings data failed", err);
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_FAIL });
    });
};

export const fetchAssessmentSetting = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_BEGIN });

  axios
    .get(
      `/api/user/assessment/settings/fetch/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch assessment settings data failed", err);
      dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_FAIL });
    });
};

export const updateAssessmentAccess = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_BEGIN });

  axios
    .post(
      `/api/user/assessment/access/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Update assessment access data failed", err);
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_FAIL });
    });
};

export const fetchAssessmentAccess = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_ACCESS_BEGIN });

  axios
    .get(
      `/api/user/assessment/access/fetch/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.FETCH_ASSESSMENT_ACCESS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch assessment settings data failed", err);
      dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_ACCESS_FAIL });
    });
};

export const updateAssessmentSet = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SET_BEGIN });

  axios
    .post(
      `/api/user/assessment/sets/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.UPDATE_ASSESSMENT_SET_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Update assessment set data failed", err);
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SET_FAIL });
    });
};

export const fetchAssessmentSet = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_SET_BEGIN });

  axios
    .get(
      `/api/user/assessment/sets/fetch/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.FETCH_ASSESSMENT_SET_SUCCESS,
          payload: res.data,
        });
      }, 3000);
    })
    .catch((err) => {
      console.log("fetch assessment sets data failed", err);
      dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_SET_FAIL });
    });
};

export const updateAssessmentTimer = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_TIMER_BEGIN });

  axios
    .post(
      `/api/user/assessment/timer/update/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.UPDATE_ASSESSMENT_TIMER_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Update assessment timer data failed", err);
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_TIMER_FAIL });
    });
};

export const fetchAssessmentTimer = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_TIMER_BEGIN });

  axios
    .get(
      `/api/user/assessment/timer/fetch/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: ASSESSMENT.FETCH_ASSESSMENT_TIMER_SUCCESS,
          payload: res.data,
        });
      }, 3000);
    })
    .catch((err) => {
      console.log("fetch assessment timer data failed", err);
      dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_TIMER_FAIL });
    });
};
