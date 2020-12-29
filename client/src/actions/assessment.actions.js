import axios from "axios";

import { ASSESSMENT } from "../utils/actionTypes";

// import { returnErrors } from "./error.actions";

export const updateAssessmentSetting = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_BEGIN });

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
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_FAIL });
    });
};

export const fetchAssessmentSetting = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_BEGIN });

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
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_FAIL });
    });
};

export const fetchAssessmentAccess = (data) => (dispatch, getState) => {
  dispatch({ type: ASSESSMENT.FETCH_ASSESSMENT_ACCESS_BEGIN });

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
