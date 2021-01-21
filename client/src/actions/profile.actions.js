import axios from "axios";

import { PROFILE_DATA } from "../utils/actionTypes";
import { returnErrors } from "./error.actions";

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

export const fetchUserProfileData = () => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.FETCH_BEGIN });

  axios
    .get("/api/user/profile", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({ type: PROFILE_DATA.FETCH_SUCCESS, payload: res.data });
      }, 3000);
    })
    .catch((err) => {
      dispatch({ type: PROFILE_DATA.FETCH_FAIL });
    });
};

export const updateUserProfileData = (data) => (dispatch, getState) => {
  dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_BEGIN });

  axios
    .post("/api/user/profile", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: PROFILE_DATA.UPDATE_PROFILE_DATA_SUCCESS,
        });
      }, 3000);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: PROFILE_DATA.UPDATE_PROFILE_DATA_FAIL });
    });
};
