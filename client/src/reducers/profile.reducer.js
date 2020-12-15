import { FETCH_PROFILE_DATA } from "../utils/actionTypes";

const initialState = {
  isLoading: false,
  profile: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_DATA.FETCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PROFILE_DATA.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
      };
    case FETCH_PROFILE_DATA.FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: null,
      };
    default:
      return state;
  }
}
