import { PROFILE_DATA } from "../utils/actionTypes";

const initialState = {
  isLoading: true,
  profile: null,
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
    case PROFILE_DATA.UPDATE_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
      };
    case PROFILE_DATA.FETCH_FAIL:
    case PROFILE_DATA.UPDATE_PROFILE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: null,
      };
    default:
      return state;
  }
}
