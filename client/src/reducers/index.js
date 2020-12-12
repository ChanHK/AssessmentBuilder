import { combineReducers } from "redux";
// import reducer here
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";

const Reducers = combineReducers({
  //add reducer here
  auth: authReducer,
  errors: errorReducer,
});

export default Reducers;