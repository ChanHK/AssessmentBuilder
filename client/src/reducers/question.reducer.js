import { QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  question: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTION.UPDATE_QUESTION_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case QUESTION.UPDATE_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        question: action.payload,
      };
    case QUESTION.UPDATE_QUESTION_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
