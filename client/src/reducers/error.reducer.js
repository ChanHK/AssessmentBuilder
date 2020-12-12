import { ERROR } from "../utils/actionTypes";

const initialState = {
  message: {}, //come from server
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ERROR.GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case ERROR.CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
