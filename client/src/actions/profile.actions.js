import axios from "axios";

import { PROFILE_DATA } from "../utils/actionTypes";

export const fetchUserProfileData = () => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.FETCH_BEGIN });

  axios
    .get("/api/user/profile", tokenConfig(getState))
    .then((res) =>
      dispatch({ type: PROFILE_DATA.FETCH_SUCCESS, payload: res.data })
    )
    .catch((err) => {
      console.log("Fetch user profile data failed", err);
      dispatch({ type: PROFILE_DATA.FETCH_FAIL });
    });
};

export const updateUserProfileData = (data) => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_BEGIN });

  axios
    .post("/api/user/profile", data, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: PROFILE_DATA.UPDATE_PROFILE_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log("Update user profile data failed", err);
      dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_FAIL });
    });
};

// setup config/headers $ token
export const tokenConfig = (getState) => {
  // get token from localstorage
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
