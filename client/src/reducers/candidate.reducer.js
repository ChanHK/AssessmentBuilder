import { CANDIDATE } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentStartInfo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CANDIDATE.FETCH_ASSESSMENT_START_INFO_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CANDIDATE.FETCH_ASSESSMENT_START_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessmentStartInfo: action.payload,
      };
    case CANDIDATE.FETCH_ASSESSMENT_START_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
