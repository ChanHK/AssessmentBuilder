import { QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  questionLoad: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTION.UPDATE_QUESTION_DATA_BEGIN:
    case QUESTION.FETCH_ALL_QUESTION_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case QUESTION.UPDATE_QUESTION_DATA_SUCCESS:
    case QUESTION.FETCH_ALL_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionLoad: action.payload,
      };
    case QUESTION.UPDATE_QUESTION_DATA_FAIL:
    case QUESTION.FETCH_ALL_QUESTION_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
