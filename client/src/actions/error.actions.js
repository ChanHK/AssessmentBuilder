import { ERROR } from "../utils/actionTypes";

// return errors
export const returnErrors = (message, status, id = null) => {
  return {
    type: ERROR.GET_ERRORS,
    payload: {
      message,
      status,
      id,
    },
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: ERROR.CLEAR_ERRORS,
  };
};
