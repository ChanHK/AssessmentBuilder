import { GET_SUCCESS_MESSAGE } from "../utils/actionTypes";

const initialState = {
  message: {}, //come from server
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS_MESSAGE.GET_MESSAGE:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
