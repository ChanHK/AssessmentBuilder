import { HOME } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  assessments: null,
  newID: null,
  pic: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_BEGIN:
    case HOME.CREATE_ASSESSMENT_OBJ_BEGIN:
    case HOME.FETCH_USER_PROFILE_PIC_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assessments: action.payload,
      };
    case HOME.HOME_FETCH_ALL_ASSESSMENTS_FAIL:
    case HOME.CREATE_ASSESSMENT_OBJ_FAIL:
    case HOME.FETCH_USER_PROFILE_PIC_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case HOME.CREATE_ASSESSMENT_OBJ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newID: action.payload,
      };
    case HOME.FETCH_USER_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pic: action.payload,
      };
    default:
      return state;
  }
}
