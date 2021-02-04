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

export const fetchDesResponses = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/grade_questions/${data.questionID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_FAIL });
    });
};

export const uploadFeedback = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.UPLOAD_FEEBACKS_BEGIN });

  axios
    .post(
      `/api/user/home/assessment/create/feedback`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.UPLOAD_FEEBACKS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("upload failed", err);
      dispatch({ type: HOME.UPLOAD_FEEBACKS_FAIL });
    });
};

export const fetchResults = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_RESULTS_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/results/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_RESULTS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_RESULTS_FAIL });
    });
};

export const fetchAResult = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_A_CAND_RESULT_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/single_result/${data.candID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_A_CAND_RESULT_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_A_CAND_RESULT_FAIL });
    });
};

export const fetchAGrade = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_GRADES_IN_GRADINGS_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/grades/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_GRADES_IN_GRADINGS_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_GRADES_IN_GRADINGS_FAIL });
    });
};

export const fetchFeedback = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_FEEDBACK_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/feedbacks/${data.candID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_FEEDBACK_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_FEEDBACK_FAIL });
    });
};

export const fetchAllInfo = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_FULL_ASSESSMENT_INFO_BEGIN });

  axios
    .get(
      `/api/user/home/assessment/fetch/assessment_questions_sets/${data.assessmentID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_FULL_ASSESSMENT_INFO_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_FULL_ASSESSMENT_INFO_FAIL });
    });
};

export const uploadStatus = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.UPDATE_ACTIVATION_STATUS_BEGIN });

  axios
    .post(
      `/api/user/home/assessment/activate/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.UPDATE_ACTIVATION_STATUS_SUCCESS,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("upload failed", err);
      dispatch({ type: HOME.UPDATE_ACTIVATION_STATUS_FAIL });
    });
};

export const addAssSub = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.ADD_NEW_SUBJECT_BEGIN });

  axios
    .post(`/api/user/home/assessment/add/subjects`, data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.ADD_NEW_SUBJECT_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: HOME.ADD_NEW_SUBJECT_FAIL });
    });
};

export const deleteAssSub = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.DELETE_ASS_SUB_BEGIN });

  axios
    .post(
      "/api/user/home2/assessment/delete/subject",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.DELETE_ASS_SUB_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: HOME.DELETE_ASS_SUB_FAIL });
    });
};

export const fetchAssSub = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.FETCH_ASS_BASED_SUB_BEGIN });

  axios
    .get(
      `/api/user/home2/assessment/fetch/assessment/${data.subject}`,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.FETCH_ASS_BASED_SUB_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      console.log("fetch failed", err);
      dispatch({ type: HOME.FETCH_ASS_BASED_SUB_FAIL });
    });
};

export const reuseAssessment = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.REUSE_ASSESSMENT_BEGIN });

  axios
    .post(
      `/api/user/home2/assessment/reuse/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.REUSE_ASSESSMENT_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: HOME.REUSE_ASSESSMENT_FAIL });
    });
};

export const deleteResults = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.DELETE_RESULT_BEGIN });

  axios
    .post(
      `/api/user/home2/assessment/result/delete/${data.candID}/${data.assessmentID}`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.DELETE_RESULT_SUCCESS,
          payload: res.data,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: HOME.DELETE_RESULT_FAIL });
    });
};

export const sendEmail = (data) => (dispatch, getState) => {
  dispatch({ type: HOME.SEND_RESULTS_BEGIN });

  axios
    .put("/api/user/home2/sent/email/result", data, tokenConfig(getState))
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: HOME.SEND_RESULTS_SUCCESS,
        });
      }, 1500);
    })
    .catch((err) => {
      dispatch({ type: HOME.SEND_RESULTS_FAIL });
    });
};
