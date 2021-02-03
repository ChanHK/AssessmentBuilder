import { ASSESSMENT_QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentQuestionLoad: null,
  direct: false,
  goingToStoreData: null,
  goingToDeleteData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_BEGIN:
    case ASSESSMENT_QUESTION.FETCH_AN_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.UPDATE_AN_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.ADD_MULTI_QUES_FROM_QB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_SUCCESS:
    case ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_SUCCESS:
    case ASSESSMENT_QUESTION.FETCH_AN_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentQuestionLoad: action.payload,
      };
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_FAIL:
    case ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_FAIL:
    case ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_FAIL:
    case ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_SUCCESS:
    case ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_FAIL:
    case ASSESSMENT_QUESTION.FETCH_AN_ASSESSMENT_QUESTION_FAIL:
    case ASSESSMENT_QUESTION.UPDATE_AN_ASSESSMENT_QUESTION_FAIL:
    case ASSESSMENT_QUESTION.ADD_MULTI_QUES_FROM_QB_SUCCESS:
    case ASSESSMENT_QUESTION.ADD_MULTI_QUES_FROM_QB_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_SUCCESS:
    case ASSESSMENT_QUESTION.UPDATE_AN_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        direct: true,
      };
    case ASSESSMENT_QUESTION.PASS_TO_STORE_DATA:
      return {
        ...state,
        goingToStoreData: action.payload,
      };
    case ASSESSMENT_QUESTION.DELETE_QUES_DATA:
      return {
        ...state,
        goingToDeleteData: action.payload,
      };
    default:
      return state;
  }
}
