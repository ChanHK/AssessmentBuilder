export const ERROR = {
  GET_ERRORS: "GET_ERRORS",
  CLEAR_ERRORS: "CLEAR_ERRORS",
};

export const LOGIN = {
  LOGIN_BEGIN: "LOGIN_BEGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};

export const REGISTER = {
  REGISTER_BEGIN: "REGISTER_BEGIN",
  REQISTER_SUCCESS: "REGISTER_SUCCESS",
  REQISTER_FAIL: "REGISTER_FAIL",
};

export const LOGOUT = {
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};

export const GET_SUCCESS_MESSAGE = {
  GET_MESSAGE: "GET_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
};

export const PROFILE_DATA = {
  FETCH_BEGIN: "FETCH_BEGIN",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",

  UPDATE_PROFILE_DATA_BEGIN: "UPDATE_PROFILE_DATA_BEGIN",
  UPDATE_PROFILE_DATA_SUCCESS: "UPDATE_PROFILE_DATA_SUCCESS",
  UPDATE_PROFILE_DATA_FAIL: "UPDATE_PROFILE_DATA_FAIL",
};

export const QUESTION = {
  UPDATE_QUESTION_DATA_BEGIN: "UPDATE_QUESTION_DATA_BEGIN",
  UPDATE_QUESTION_DATA_SUCCESS: "UPDATE_QUESTION_DATA_SUCCESS",
  UPDATE_QUESTION_DATA_FAIL: "UPDATE_QUESTION_DATA_FAIL",

  FETCH_QUESTION_DATA_BEGIN: "FETCH_QUESTION_DATA_BEGIN",
  FETCH_QUESTION_DATA_SUCCESS: "FETCH_QUESTION_DATA_SUCCESS",
  FETCH_QUESTION_DATA_FAIL: "FETCH_QUESTION_DATA_FAIL",

  DELETE_QUESTION_DATA_BEGIN: "DELETE_QUESTION_DATA_BEGIN",
  DELETE_QUESTION_DATA_SUCCESS: "DELETE_QUESTION_DATA_SUCCESS",
  DELETE_QUESTION_DATA_FAIL: "DELETE_QUESTION_DATA_FAIL",

  FETCH_ALL_QUESTION_DATA_BEGIN: "FETCH_ALL_QUESTION_DATA_BEGIN",
  FETCH_ALL_QUESTION_DATA_SUCCESS: "FETCH_ALL_QUESTION_DATA_SUCCESS",
  FETCH_ALL_QUESTION_DATA_FAIL: "FETCH_ALL_QUESTION_DATA_FAIL",

  UPDATE_QUESTION_BANK_SUB_BEGIN: "UPDATE_QUESTION_BANK_SUB_BEGIN",
  UPDATE_QUESTION_BANK_SUB_SUCCESS: "UPDATE_QUESTION_BANK_SUB_SUCCESS",
  UPDATE_QUESTION_BANK_SUB_FAIL: "UPDATE_QUESTION_BANK_SUB_FAIL",

  DELETE_QUESTION_BANK_BEGIN: "DELETE_QUESTION_BANK_BEGIN",
  DELETE_QUESTION_BANK_SUCCESS: "DELETE_QUESTION_BANK_SUCCESS",
  DELETE_QUESTION_BANK_FAIL: "DELETE_QUESTION_BANK_FAIL",

  FETCH_QUESTION_BASED_ON_SUB_BEGIN: "FETCH_QUESTION_BASED_ON_SUB_BEGIN",
  FETCH_QUESTION_BASED_ON_SUB_SUCCESS: "FETCH_QUESTION_BASED_ON_SUB_SUCCESS",
  FETCH_QUESTION_BASED_ON_SUB_FAIL: "FETCH_QUESTION_BASED_ON_SUB_FAIL",

  MOVE_QUESTION_BEGIN: "MOVE_QUESTION_BEGIN",
  MOVE_QUESTION_SUCCESS: "MOVE_QUESTION_SUCCESS",
  MOVE_QUESTION_FAIL: "MOVE_QUESTION_FAIL",

  FETCH_ALL_QUESTIONS_IN_ASS_BEGIN: "FETCH_ALL_QUESTIONS_IN_ASS_BEGIN",
  FETCH_ALL_QUESTIONS_IN_ASS_SUCCESS: "FETCH_ALL_QUESTIONS_IN_ASS_SUCCESS",
  FETCH_ALL_QUESTIONS_IN_ASS_FAIL: "FETCH_ALL_QUESTIONS_IN_ASS_FAIL",
};

export const ASSESSMENT = {
  UPDATE_ASSESSMENT_SETTINGS_BEGIN: "UPDATE_ASSESSMENT_SETTINGS_BEGIN",
  UPDATE_ASSESSMENT_SETTINGS_SUCCESS: "UPDATE_ASSESSMENT_SETTINGS_SUCCESS",
  UPDATE_ASSESSMENT_SETTINGS_FAIL: "UPDATE_ASSESSMENT_SETTINGS_SUCCESS",

  FETCH_ASSESSMENT_SETTINGS_BEGIN: "FETCH_ASSESSMENT_SETTINGS_BEGIN",
  FETCH_ASSESSMENT_SETTINGS_SUCCESS: "FETCH_ASSESSMENT_SETTINGS_SUCCESS",
  FETCH_ASSESSMENT_SETTINGS_FAIL: "FETCH_ASSESSMENT_SETTINGS_FAIL",

  UPDATE_ASSESSMENT_ACCESS_BEGIN: "UPDATE_ASSESSMENT_ACCESS_BEGIN",
  UPDATE_ASSESSMENT_ACCESS_SUCCESS: "UPDATE_ASSESSMENT_ACCESS_SUCCESS",
  UPDATE_ASSESSMENT_ACCESS_FAIL: "UPDATE_ASSESSMENT_ACCESS_FAIL",

  FETCH_ASSESSMENT_ACCESS_BEGIN: "FETCH_ASSESSMENT_ACCESS_BEGIN",
  FETCH_ASSESSMENT_ACCESS_SUCCESS: "FETCH_ASSESSMENT_ACCESS_SUCCESS",
  FETCH_ASSESSMENT_ACCESS_FAIL: "FETCH_ASSESSMENT_ACCESS_FAIL",

  UPDATE_ASSESSMENT_SET_BEGIN: "UPDATE_ASSESSMENT_SET_BEGIN",
  UPDATE_ASSESSMENT_SET_SUCCESS: "UPDATE_ASSESSMENT_SET_SUCCESS",
  UPDATE_ASSESSMENT_SET_FAIL: "UPDATE_ASSESSMENT_SET_FAIL",

  FETCH_ASSESSMENT_SET_BEGIN: "FETCH_ASSESSMENT_SET_BEGIN",
  FETCH_ASSESSMENT_SET_SUCCESS: "FETCH_ASSESSMENT_SET_SUCCESS",
  FETCH_ASSESSMENT_SET_FAIL: "FETCH_ASSESSMENT_SET_FAIL",

  UPDATE_ASSESSMENT_TIMER_BEGIN: "UPDATE_ASSESSMENT_TIMER_BEGIN",
  UPDATE_ASSESSMENT_TIMER_SUCCESS: "UPDATE_ASSESSMENT_TIMER_SUCCESS",
  UPDATE_ASSESSMENT_TIMER_FAIL: "UPDATE_ASSESSMENT_TIMER_FAIL",

  FETCH_ASSESSMENT_TIMER_BEGIN: "FETCH_ASSESSMENT_TIMER_BEGIN",
  FETCH_ASSESSMENT_TIMER_SUCCESS: "FETCH_ASSESSMENT_TIMER_SUCCESS",
  FETCH_ASSESSMENT_TIMER_FAIL: "FETCH_ASSESSMENT_TIMER_FAIL",
};

export const ASSESSMENT_QUESTION = {
  ADD_ASSESSMENT_QUESTION_BEGIN: "ADD_ASSESSMENT_QUESTION_BEGIN",
  ADD_ASSESSMENT_QUESTION_SUCCESS: "ADD_ASSESSMENT_QUESTION_SUCCESS",
  ADD_ASSESSMENT_QUESTION_FAIL: "ADD_ASSESSMENT_QUESTION_FAIL",

  FETCH_ALL_ASSESSMENT_QUESTION_BEGIN: "FETCH_ALL_ASSESSMENT_QUESTION_BEGIN",
  FETCH_ALL_ASSESSMENT_QUESTION_SUCCESS: "FETCH_ALL_ASSESSMENT_QUESTION_SUCCESS",
  FETCH_ALL_ASSESSMENT_QUESTION_FAIL: "FETCH_ALL_ASSESSMENT_QUESTION_FAIL",

  UPDATE_ALL_ASSESSMENT_QUESTION_BEGIN: "UPDATE_ALL_ASSESSMENT_QUESTION_BEGIN",
  UPDATE_ALL_ASSESSMENT_QUESTION_SUCCESS: "UPDATE_ALL_ASSESSMENT_QUESTION_SUCCESS",
  UPDATE_ALL_ASSESSMENT_QUESTION_FAIL: "UPDATE_ALL_ASSESSMENT_QUESTION_FAIL",

  ADD_TO_QUESTION_BANK_BEGIN: "ADD_TO_QUESTION_BANK_BEGIN",
  ADD_TO_QUESTION_BANK_SUCCESS: "ADD_TO_QUESTION_BANK_SUCCESS",
  ADD_TO_QUESTION_BANK_FAIL: "ADD_TO_QUESTION_BANK_FAIL",

  DELETE_ASSESSMENT_QUESTION_BEGIN: "DELETE_ASSESSMENT_QUESTION_BEGIN",
  DELETE_ASSESSMENT_QUESTION_SUCCESS: "DELETE_ASSESSMENT_QUESTION_SUCCESS",
  DELETE_ASSESSMENT_QUESTION_FAIL: "DELETE_ASSESSMENT_QUESTION_FAIL",

  FETCH_AN_ASSESSMENT_QUESTION_BEGIN: "FETCH_AN_ASSESSMENT_QUESTION_BEGIN",
  FETCH_AN_ASSESSMENT_QUESTION_SUCCESS: "FETCH_AN_ASSESSMENT_QUESTION_SUCCESS",
  FETCH_AN_ASSESSMENT_QUESTION_FAIL: "FETCH_AN_ASSESSMENT_QUESTION_SUCCESS",

  UPDATE_AN_ASSESSMENT_QUESTION_BEGIN: "UPDATE_AN_ASSESSMENT_QUESTION_BEGIN",
  UPDATE_AN_ASSESSMENT_QUESTION_SUCCESS: "UPDATE_AN_ASSESSMENT_QUESTION_SUCCESS",
  UPDATE_AN_ASSESSMENT_QUESTION_FAIL: "UPDATE_AN_ASSESSMENT_QUESTION_FAIL",

  ADD_MULTI_QUES_FROM_QB_BEGIN: "ADD_MULTI_QUES_FROM_QB_BEGIN",
  ADD_MULTI_QUES_FROM_QB_SUCCESS: "ADD_MULTI_QUES_FROM_QB_SUCCESS",
  ADD_MULTI_QUES_FROM_QB_FAIL: "ADD_MULTI_QUES_FROM_QB_FAIL",
};

export const ASSESSMENT_SET = {
  UPDATE_ASSESSMENT_SET_QUESTION_ID_BEGIN: "UPDATE_ASSESSMENT_SET_QUESTION_ID_BEGIN",
  UPDATE_ASSESSMENT_SET_QUESTION_ID_SUCCESS: "UPDATE_ASSESSMENT_SET_QUESTION_ID_SUCCESS",
  UPDATE_ASSESSMENT_SET_QUESTION_ID_FAIL: "UPDATE_ASSESSMENT_SET_QUESTION_ID_FAIL",

  FETCH_ASSESSMENT_SET_QUESTION_ID_BEGIN: "FETCH_ASSESSMENT_SET_QUESTION_ID_BEGIN",
  FETCH_ASSESSMENT_SET_QUESTION_ID_SUCCESS: "FETCH_ASSESSMENT_SET_QUESTION_ID_SUCCESS",
  FETCH_ASSESSMENT_SET_QUESTION_ID_FAIL: "FETCH_ASSESSMENT_SET_QUESTION_ID_FAIL",

  FETCH_SET_QUESTIONS_BEGIN: "FETCH_SET_QUESTIONS_BEGIN",
  FETCH_SET_QUESTIONS_SUCCESS: "FETCH_SET_QUESTIONS_SUCCESS",
  FETCH_SET_QUESTIONS_FAIL: "FETCH_SET_QUESTIONS_FAIL",
}

export const CANDIDATE = {
  FETCH_ASSESSMENT_START_INFO_BEGIN: "FETCH_ASSESSMENT_START_INFO_BEGIN",
  FETCH_ASSESSMENT_START_INFO_SUCCESS: "FETCH_ASSESSMENT_START_INFO_SUCCESS",
  FETCH_ASSESSMENT_START_INFO_FAIL: "FETCH_ASSESSMENT_START_INFO_FAIL",

  CANDIDATE_REQ_WITH_AC_BEGIN: "CANDIDATE_REQ_WITH_AC_BEGIN",
  CANDIDATE_REQ_WITH_AC_SUCCESS: "CANDIDATE_REQ_WITH_AC_SUCCESS",
  CANDIDATE_REQ_WITH_AC_FAIL: "CANDIDATE_REQ_WITH_AC_FAIL",

  CANDIDATE_REQ_WITHOUT_AC_BEGIN: "CANDIDATE_REQ_WITHOUT_AC_BEGIN",
  CANDIDATE_REQ_WITHOUT_AC_SUCCESS: "CANDIDATE_REQ_WITHOUT_AC_SUCCESS",
  CANDIDATE_REQ_WITHOUT_AC_FAIL: "CANDIDATE_REQ_WITHOUT_AC_FAIL",

  FETCH_ASSESSMENT_SET_CANDIDATE_BEGIN: "FETCH_ASSESSMENT_SET_CANDIDATE_BEGIN",
  FETCH_ASSESSMENT_SET_CANDIDATE_SUCCESS: "FETCH_ASSESSMENT_SET_CANDIDATE_SUCCESS",
  FETCH_ASSESSMENT_SET_CANDIDATE_FAIL: "FETCH_ASSESSMENT_SET_CANDIDATE_FAIL",

  FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_BEGIN: "FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_BEGIN",
  FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_SUCCESS: "FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_SUCCESS",
  FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_FAIL: "FETCH_ASSESSMENT_ALL_QUESTIONS_CANDIDATE_FAIL",

  UPLOAD_CANDIDATE_RESPONSE_BEGIN: "UPLOAD_CANDIDATE_RESPONSE_BEGIN",
  UPLOAD_CANDIDATE_RESPONSE_SUCCESS: "UPLOAD_CANDIDATE_RESPONSE_SUCCESS",
  UPLOAD_CANDIDATE_RESPONSE_FAIL: "UPLOAD_CANDIDATE_RESPONSE_FAIL",

  FETCH_GRADES_BEGIN: "FETCH_GRADES_BEGIN",
  FETCH_GRADES_SUCCESS: "FETCH_GRADES_SUCCESS",
  FETCH_GRADES_FAIL: "FETCH_GRADES_FAIL",
}

export const HOME = {
  HOME_FETCH_ALL_ASSESSMENTS_BEGIN: "HOME_FETCH_ALL_ASSESSMENTS_BEGIN",
  HOME_FETCH_ALL_ASSESSMENTS_SUCCESS: "HOME_FETCH_ALL_ASSESSMENTS_SUCCESS",
  HOME_FETCH_ALL_ASSESSMENTS_FAIL: "HOME_FETCH_ALL_ASSESSMENTS_FAIL",

  CREATE_ASSESSMENT_OBJ_BEGIN: "CREATE_ASSESSMENT_OBJ_BEGIN",
  CREATE_ASSESSMENT_OBJ_SUCCESS: "CREATE_ASSESSMENT_OBJ_SUCCESS",
  CREATE_ASSESSMENT_OBJ_FAIL: "CREATE_ASSESSMENT_OBJ_FAIL",

  FETCH_USER_PROFILE_PIC_BEGIN: "FETCH_USER_PROFILE_PIC_BEGIN",
  FETCH_USER_PROFILE_PIC_SUCCESS: "FETCH_USER_PROFILE_PIC_SUCCESS",
  FETCH_USER_PROFILE_PIC_FAIL: "FETCH_USER_PROFILE_PIC_FAIL",

  DELETE_ASSESSMENT_BEGIN: "DELETE_ASSESSMENT_BEGIN",
  DELETE_ASSESSMENT_SUCCESS: "DELETE_ASSESSMENT_SUCCESS",
  DELETE_ASSESSMENT_FAIL: "DELETE_ASSESSMENT_FAIL",

  FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_BEGIN: "FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_BEGIN",
  FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_SUCCESS: "FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_SUCCESS",
  FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_FAIL: "FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_FAIL",

  FETCH_CANDIDATE_DESCRIPTION_RESPONSES_BEGIN: "FETCH_CANDIDATE_DESCRIPTION_RESPONSES_BEGIN",
  FETCH_CANDIDATE_DESCRIPTION_RESPONSES_SUCCESS: "FETCH_CANDIDATE_DESCRIPTION_RESPONSES_SUCCESS",
  FETCH_CANDIDATE_DESCRIPTION_RESPONSES_FAIL: "FETCH_CANDIDATE_DESCRIPTION_RESPONSES_FAIL",

  UPLOAD_FEEBACKS_BEGIN: "UPLOAD_FEEBACKS_BEGIN",
  UPLOAD_FEEBACKS_SUCCESS: "UPLOAD_FEEBACKS_SUCCESS",
  UPLOAD_FEEBACKS_FAIL: "UPLOAD_FEEBACKS_FAIL",

  FETCH_RESULTS_BEGIN: "FETCH_RESULTS_BEGIN",
  FETCH_RESULTS_SUCCESS: "FETCH_RESULTS_SUCCESS",
  FETCH_RESULTS_FAIL: "FETCH_RESULTS_FAIL",

  FETCH_A_CAND_RESULT_BEGIN: "FETCH_A_CAND_RESULT_BEGIN",
  FETCH_A_CAND_RESULT_SUCCESS: "FETCH_A_CAND_RESULT_SUCCESS",
  FETCH_A_CAND_RESULT_FAIL: "FETCH_A_CAND_RESULT_FAIL",

  FETCH_GRADES_IN_GRADINGS_BEGIN: "FETCH_GRADES_IN_GRADINGS_BEGIN",
  FETCH_GRADES_IN_GRADINGS_SUCCESS: "FETCH_GRADES_IN_GRADINGS_SUCCESS",
  FETCH_GRADES_IN_GRADINGS_FAIL: "FETCH_GRADES_IN_GRADINGS_FAIL",

  FETCH_FEEDBACK_BEGIN: "FETCH_FEEDBACK_BEGIN",
  FETCH_FEEDBACK_SUCCESS: "FETCH_FEEDBACK_SUCCESS",
  FETCH_FEEDBACK_FAIL: "FETCH_FEEDBACK_FAIL",

  FETCH_FULL_ASSESSMENT_INFO_BEGIN: "FETCH_FULL_ASSESSMENT_INFO_BEGIN",
  FETCH_FULL_ASSESSMENT_INFO_SUCCESS: "FETCH_FULL_ASSESSMENT_INFO_SUCCESS",
  FETCH_FULL_ASSESSMENT_INFO_FAIL: "FETCH_FULL_ASSESSMENT_INFO_FAIL",

  UPDATE_ACTIVATION_STATUS_BEGIN: "UPDATE_ACTIVATION_STATUS_BEGIN",
  UPDATE_ACTIVATION_STATUS_SUCCESS: "UPDATE_ACTIVATION_STATUS_SUCCESS",
  UPDATE_ACTIVATION_STATUS_FAIL: "UPDATE_ACTIVATION_STATUS_FAIL",

  ADD_NEW_SUBJECT_BEGIN: "ADD_NEW_SUBJECT_BEGIN",
  ADD_NEW_SUBJECT_SUCCESS: "ADD_NEW_SUBJECT_SUCCESS",
  ADD_NEW_SUBJECT_FAIL: "ADD_NEW_SUBJECT_FAIL",

  DELETE_ASS_SUB_BEGIN: "DELETE_ASS_SUB_BEGIN",
  DELETE_ASS_SUB_SUCCESS: "DELETE_ASS_SUB_SUCCESS",
  DELETE_ASS_SUB_FAIL: "DELETE_ASS_SUB_FAIL",

  FETCH_ASS_BASED_SUB_BEGIN: "FETCH_ASS_BASED_SUB_BEGIN",
  FETCH_ASS_BASED_SUB_SUCCESS: "FETCH_ASS_BASED_SUB_SUCCESS",
  FETCH_ASS_BASED_SUB_FAIL: "FETCH_ASS_BASED_SUB_FAIL",
}