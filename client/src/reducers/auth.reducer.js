import { LOGIN, LOGOUT, REGISTER } from "../utils/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN.LOGIN_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN.LOGIN_SUCCESS:
    case REGISTER.REQISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN.LOGIN_FAIL:
    case LOGOUT.LOGOUT_SUCCESS:
    case REGISTER.REQISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
