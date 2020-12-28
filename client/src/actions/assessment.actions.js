import axios from "axios";

import { ASSESSMENT } from "../utils/actionTypes";

import { returnSucMsg } from "./sucMsg.actions";

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
    .post("/api/user/assessment/settings", data, tokenConfig(getState))
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
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
