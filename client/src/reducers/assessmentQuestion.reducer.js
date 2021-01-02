import { ASSESSMENT_QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentQuestionLoad: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_BEGIN:
    case ASSESSMENT_QUESTION.ADD_TO_QUESTION_BANK_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_SUCCESS:
    case ASSESSMENT_QUESTION.FETCH_ALL_ASSESSMENT_QUESTION_SUCCESS:
    case ASSESSMENT_QUESTION.UPDATE_ALL_ASSESSMENT_QUESTION_SUCCESS:
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
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
