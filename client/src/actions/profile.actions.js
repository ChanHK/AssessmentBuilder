import axios from "axios";

import { FETCH_PROFILE_DATA } from "../utils/actionTypes";

export const fetchUserProfileData = () => (dispatch, getState) => {
  dispatch({ type: FETCH_PROFILE_DATA.FETCH_BEGIN });

  axios
    .get("/api/user/profile", tokenConfig(getState))
    .then((res) =>
      dispatch({ type: FETCH_PROFILE_DATA.FETCH_SUCCESS, payload: res.data })
    )
    .catch((err) => {
      console.log("Fetch use profile data failed", err);
      dispatch({ type: FETCH_PROFILE_DATA.FETCH_FAIL });
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
