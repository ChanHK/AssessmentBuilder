import { ASSESSMENT } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentLoad: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_BEGIN:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_BEGIN:
    case ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_BEGIN:
    case ASSESSMENT.FETCH_ASSESSMENT_ACCESS_BEGIN:
    case ASSESSMENT.UPDATE_ASSESSMENT_SET_BEGIN:
    case ASSESSMENT.FETCH_ASSESSMENT_SET_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_SUCCESS:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_SUCCESS:
    case ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_SUCCESS:
    case ASSESSMENT.FETCH_ASSESSMENT_ACCESS_SUCCESS:
    case ASSESSMENT.UPDATE_ASSESSMENT_SET_SUCCESS:
    case ASSESSMENT.FETCH_ASSESSMENT_SET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentLoad: action.payload,
      };
    case ASSESSMENT.UPDATE_ASSESSMENT_SETTINGS_FAIL:
    case ASSESSMENT.FETCH_ASSESSMENT_SETTINGS_FAIL:
    case ASSESSMENT.UPDATE_ASSESSMENT_ACCESS_FAIL:
    case ASSESSMENT.FETCH_ASSESSMENT_ACCESS_FAIL:
    case ASSESSMENT.UPDATE_ASSESSMENT_SET_FAIL:
    case ASSESSMENT.FETCH_ASSESSMENT_SET_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
