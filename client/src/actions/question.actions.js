import axios from "axios";
import { QUESTION } from "../utils/actionTypes";

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
      setTimeout(() => {
        dispatch({
          type: QUESTION.DELETE_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 500);
    })
    .catch((err) => {
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
      setTimeout(() => {
        dispatch({
          type: QUESTION.UPDATE_QUESTION_DATA_SUCCESS,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: QUESTION.UPDATE_QUESTION_DATA_FAIL });
    });
};

export const fetchQuestionBankData = () => (dispatch, getState) => {
  dispatch({ type: QUESTION.FETCH_ALL_QUESTION_DATA_BEGIN });

  axios
    .get("/api/user/question/subject", tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.FETCH_ALL_QUESTION_DATA_SUCCESS,
          payload: res.data,
        });
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: QUESTION.FETCH_ALL_QUESTION_DATA_FAIL });
    });
};

export const updateQuestionBankSub = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.UPDATE_QUESTION_BANK_SUB_BEGIN });

  axios
    .post("/api/user/question/update/subjects", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.UPDATE_QUESTION_BANK_SUB_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: QUESTION.UPDATE_QUESTION_BANK_SUB_FAIL });
    });
};

export const deleteQuestionBank = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.DELETE_QUESTION_BANK_BEGIN });

  axios
    .post("/api/user/question/delete/subjects", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.DELETE_QUESTION_BANK_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: QUESTION.DELETE_QUESTION_BANK_FAIL });
    });
};

export const fetchQuestionDataOnSub = (data) => (dispatch, getState) => {
  dispatch({ type: QUESTION.FETCH_QUESTION_BASED_ON_SUB_BEGIN });

  axios
    .get(
      `/api/user/question/subject/fetch/${data.subject}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: QUESTION.FETCH_QUESTION_BASED_ON_SUB_SUCCESS,
          payload: res.data,
        });
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: QUESTION.FETCH_QUESTION_BASED_ON_SUB_FAIL });
    });
};
