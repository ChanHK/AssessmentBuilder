import { QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  questionLoad: null, //stores single question data which displays in page
  direct: false,
  questionBankData: null, //stores totalsubjects only
  questionData: null, //stores all question data which displays in table
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTION.UPDATE_QUESTION_DATA_BEGIN:
    case QUESTION.FETCH_QUESTION_DATA_BEGIN:
    case QUESTION.FETCH_ALL_QUESTION_DATA_BEGIN:
    case QUESTION.UPDATE_QUESTION_BANK_SUB_BEGIN:
    case QUESTION.DELETE_QUESTION_BANK_BEGIN:
    case QUESTION.FETCH_QUESTION_BASED_ON_SUB_BEGIN:
    case QUESTION.MOVE_QUESTION_BEGIN:
    case QUESTION.FETCH_ALL_QUESTIONS_IN_ASS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case QUESTION.DELETE_QUESTION_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
        ...action.payload,
      };
    case QUESTION.FETCH_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionLoad: action.payload,
      };
    case QUESTION.UPDATE_QUESTION_DATA_FAIL:
    case QUESTION.FETCH_QUESTION_DATA_FAIL:
    case QUESTION.DELETE_QUESTION_DATA_FAIL:
    case QUESTION.FETCH_ALL_QUESTION_DATA_FAIL:
    case QUESTION.UPDATE_QUESTION_BANK_SUB_FAIL:
    case QUESTION.DELETE_QUESTION_BANK_FAIL:
    case QUESTION.FETCH_QUESTION_BASED_ON_SUB_FAIL:
    case QUESTION.MOVE_QUESTION_FAIL:
    case QUESTION.FETCH_ALL_QUESTIONS_IN_ASS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case QUESTION.UPDATE_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        direct: true,
      };
    case QUESTION.FETCH_ALL_QUESTION_DATA_SUCCESS:
    case QUESTION.UPDATE_QUESTION_BANK_SUB_SUCCESS:
    case QUESTION.DELETE_QUESTION_BANK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionBankData: action.payload,
      };
    case QUESTION.FETCH_QUESTION_BASED_ON_SUB_SUCCESS:
    case QUESTION.DELETE_QUESTION_DATA_SUCCESS:
    case QUESTION.MOVE_QUESTION_SUCCESS:
    case QUESTION.FETCH_ALL_QUESTIONS_IN_ASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionData: action.payload,
      };
    default:
      return state;
  }
}
