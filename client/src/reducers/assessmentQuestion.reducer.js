import { ASSESSMENT_QUESTION } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentQuestionLoad: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentLoad: action.payload,
      };
    case ASSESSMENT_QUESTION.ADD_ASSESSMENT_QUESTION_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
