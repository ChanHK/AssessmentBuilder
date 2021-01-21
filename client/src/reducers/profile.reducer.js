import { PROFILE_DATA } from "../utils/actionTypes";

const initialState = {
  isLoading: true,
  profile: null,
  direct: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_DATA.FETCH_BEGIN:
    case PROFILE_DATA.UPDATE_PROFILE_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE_DATA.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
      };
    case PROFILE_DATA.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: null,
      };
    case PROFILE_DATA.UPDATE_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        direct: true,
      };
    case PROFILE_DATA.UPDATE_PROFILE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
