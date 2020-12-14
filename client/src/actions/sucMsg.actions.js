import { GET_SUCCESS_MESSAGE } from "../utils/actionTypes";

// return success message
export const returnSucMsg = (message, status, id = null) => {
  return {
    type: GET_SUCCESS_MESSAGE.GET_MESSAGE,
    payload: {
      message,
      status,
      id,
    },
  };
};
