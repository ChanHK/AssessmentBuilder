import axios from "axios";

import { PROFILE_DATA } from "../utils/actionTypes";

// import { returnErrors } from "./error.actions";
import { returnSucMsg } from "./sucMsg.actions";

export const fetchUserProfileData = () => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.FETCH_BEGIN });

  const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) config.headers["x-auth-token"] = token;

    return config;
  };

  axios
    .get("/api/user/profile", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({ type: PROFILE_DATA.FETCH_SUCCESS, payload: res.data });
      }, 3000);
    })
    .catch((err) => {
      console.log("Fetch user profile data failed", err);
      dispatch({ type: PROFILE_DATA.FETCH_FAIL });
    });
};

export const updateUserProfileData = (data) => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_BEGIN });

  const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (token) config.headers["x-auth-token"] = token;

    return config;
  };

  axios
    .post("/api/user/profile", data, tokenConfig(getState))
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
      setTimeout(() => {
        dispatch({
          type: PROFILE_DATA.UPDATE_PROFILE_DATA_SUCCESS,
          payload: res.data,
        });
      }, 3000);
    })
    .catch((err) => {
      console.log("Update user profile data failed", err);
      dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_FAIL });
    });
};
