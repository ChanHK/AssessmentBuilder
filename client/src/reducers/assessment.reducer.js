import { ASSESSMENT } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentLoad: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_BEGIN:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_SUCCESS:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentLoad: action.payload,
      };
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_FAIL:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
