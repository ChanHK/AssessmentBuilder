import { ASSESSMENT_SET } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  questions: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_SET.FETCH_SET_QUESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
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
