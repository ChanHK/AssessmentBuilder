import axios from "axios";
import { QUESTION } from "../utils/actionTypes";
import { returnSucMsg } from "./sucMsg.actions";
import { returnErrors } from "./error.actions";

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

export const updateQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_BEGIN });

  axios
    .post("/api/user/question", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.UPDATE_QUESTION_DATA_SUCCESS,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_FAIL });
    });
};

export const fetchAllQuestionData = () => (dispatch, getState) => {
  dispatch({ type: QUESTION.FETCH_QUESTION_DATA_BEGIN });

  axios
    .get("/api/user/question", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.FETCH_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 2000);
    })
    .catch((err) => {
      console.log("Fetch question data failed", err);
      dispatch({ type: QUESTION.FETCH_QUESTION_DATA_FAIL });
    });
};

export const deleteQuestionData = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.DELETE_QUESTION_DATA_BEGIN });

  axios
    .post("/api/user/question/delete", data, tokenConfig(getState))
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
      setTimeout(() => {
        dispatch({
          type: QUESTION.DELETE_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 500);
    })
    .catch((err) => {
      console.log("Delete question data failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: QUESTION.DELETE_QUESTION_DATA_FAIL });
    });
};

export const fetchAQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.FETCH_QUESTION_DATA_BEGIN });

  axios
    .get(`/api/user/question/view/${data.questionID}`, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.FETCH_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 3000);
    })
    .catch((err) => {
      console.log("Fetch question data failed", err);
      dispatch({ type: QUESTION.FETCH_QUESTION_DATA_FAIL });
    });
};

export const updateAQuestion = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_BEGIN });

  axios
    .post(
      `/api/user/question/edit/${data.questionID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(returnSucMsg(res.data, res.status));
      setTimeout(() => {
        dispatch({
          type: QUESTION.UPDATE_QUESTION_DATA_SUCCESS,
          // payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("Update question data failed", err);
      //   dispatch(returnErrors(res.data, res.status));
      dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_FAIL });
    });
};
