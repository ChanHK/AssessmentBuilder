import { ASSESSMENT_SET } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentSetLoad: null,
  questions: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_BEGIN:
    case ASSESSMENT_SET.FETCH_ASSESSMENT_SET_QUESTION_ID_BEGIN:
    case ASSESSMENT_SET.FETCH_SET_QUESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_SUCCESS:
    case ASSESSMENT_SET.FETCH_ASSESSMENT_SET_QUESTION_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentSetLoad: action.payload,
      };
    case ASSESSMENT_SET.UPDATE_ASSESSMENT_SET_QUESTION_ID_FAIL:
    case ASSESSMENT_SET.FETCH_ASSESSMENT_SET_QUESTION_ID_FAIL:
    case ASSESSMENT_SET.FETCH_SET_QUESTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ASSESSMENT_SET.FETCH_SET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };
    default:
      return state;
  }
}
