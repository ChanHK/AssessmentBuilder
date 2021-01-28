import { QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  questionLoad: null,
  direct: false,
  questionBankData: null,
  questionData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTION.UPDATE_QUESTION_DATA_BEGIN:
    case QUESTION.FETCH_QUESTION_DATA_BEGIN:
    case QUESTION.FETCH_ALL_QUESTION_DATA_BEGIN:
    case QUESTION.UPDATE_QUESTION_BANK_SUB_BEGIN:
    case QUESTION.DELETE_QUESTION_BANK_BEGIN:
    case QUESTION.FETCH_QUESTION_BASED_ON_SUB_BEGIN:
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
    case QUESTION.DELETE_QUESTION_DATA_SUCCESS:
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
      return {
        ...state,
        isLoading: false,
        questionData: action.payload,
      };
    default:
      return state;
  }
}
