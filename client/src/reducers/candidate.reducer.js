import { CANDIDATE } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessmentStartInfo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CANDIDATE.FETCH_ASSESSMENT_START_INFO_BEGIN:
    case CANDIDATE.CANDIDATE_REQ_WITH_AC_BEGIN:
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
    case CANDIDATE.CANDIDATE_REQ_WITH_AC_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case CANDIDATE.CANDIDATE_REQ_WITH_AC_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
