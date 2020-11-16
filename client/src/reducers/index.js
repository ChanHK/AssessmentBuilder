import { combineReducers } from "redux";
// import reducer here
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";

const appReducer = combineReducers({
  //add reducer here
  auth: authReducer,
  errors: errorReducer,
});

const Reducers = (state, action) => {
  if (action.type === "REQUEST_USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default Reducers;
