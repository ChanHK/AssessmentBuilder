import { HOME } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessments: null, //stores assessments data only
  assessmentData: null, //stores all type of assessment data
  newID: null,
  pic: null,
  desQuestions: null,
  desResponses: null,
  results: null,
  aCandResult: null,
  grade: null,
  feedback: null,
  fullInfoData: null,
  direct: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_BEGIN:
    case HOME.CREATE_ASSESSMENT_OBJ_BEGIN:
    case HOME.FETCH_USER_PROFILE_PIC_BEGIN:
    case HOME.DELETE_ASSESSMENT_BEGIN:
    case HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_BEGIN:
    case HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_BEGIN:
    case HOME.UPLOAD_FEEBACKS_BEGIN:
    case HOME.FETCH_RESULTS_BEGIN:
    case HOME.FETCH_A_CAND_RESULT_BEGIN:
    case HOME.FETCH_GRADES_IN_GRADINGS_BEGIN:
    case HOME.FETCH_FEEDBACK_BEGIN:
    case HOME.FETCH_FULL_ASSESSMENT_INFO_BEGIN:
    case HOME.UPDATE_ACTIVATION_STATUS_BEGIN:
    case HOME.ADD_NEW_SUBJECT_BEGIN:
    case HOME.DELETE_ASS_SUB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_SUCCESS:
    case HOME.ADD_NEW_SUBJECT_SUCCESS:
    case HOME.DELETE_ASS_SUB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentData: action.payload,
      };
    case HOME.DELETE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessments: action.payload,
      };
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_FAIL:
    case HOME.CREATE_ASSESSMENT_OBJ_FAIL:
    case HOME.FETCH_USER_PROFILE_PIC_FAIL:
    case HOME.DELETE_ASSESSMENT_FAIL:
    case HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_FAIL:
    case HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_FAIL:
    case HOME.UPLOAD_FEEBACKS_FAIL:
    case HOME.FETCH_RESULTS_FAIL:
    case HOME.FETCH_A_CAND_RESULT_FAIL:
    case HOME.FETCH_GRADES_IN_GRADINGS_FAIL:
    case HOME.FETCH_FEEDBACK_FAIL:
    case HOME.FETCH_FULL_ASSESSMENT_INFO_FAIL:
    case HOME.UPDATE_ACTIVATION_STATUS_FAIL:
    case HOME.ADD_NEW_SUBJECT_FAIL:
    case HOME.DELETE_ASS_SUB_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case HOME.CREATE_ASSESSMENT_OBJ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newID: action.payload,
      };
    case HOME.FETCH_USER_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pic: action.payload,
      };
    case HOME.FETCH_ASSESSMENT_DESCRIPTIVE_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        desQuestions: action.payload,
      };
    case HOME.FETCH_CANDIDATE_DESCRIPTION_RESPONSES_SUCCESS:
    case HOME.UPLOAD_FEEBACKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        desResponses: action.payload,
      };
    case HOME.FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.payload,
      };
    case HOME.FETCH_A_CAND_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        aCandResult: action.payload,
      };
    case HOME.FETCH_GRADES_IN_GRADINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grade: action.payload,
      };
    case HOME.FETCH_FEEDBACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        feedback: action.payload,
      };
    case HOME.FETCH_FULL_ASSESSMENT_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fullInfoData: action.payload,
      };
    case HOME.UPDATE_ACTIVATION_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        direct: true,
      };
    default:
      return state;
  }
}
