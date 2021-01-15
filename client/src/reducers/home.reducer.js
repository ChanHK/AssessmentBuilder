import { HOME } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessments: null,
  newID: null,
  pic: null,
  desQuestions: null,
  desResponses: null,
  results: null,
  grade: null,
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
    case HOME.FETCH_GRADES_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_SUCCESS:
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
    case HOME.FETCH_GRADES_FAIL:
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
    case HOME.FETCH_GRADES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grade: action.payload,
      };
    default:
      return state;
  }
}
