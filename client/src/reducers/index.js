import { combineReducers } from "redux";
// import reducer here
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import sucMsgReducer from "./sucMsg.reducer";

const Reducers = combineReducers({
  //add reducer here
  auth: authReducer,
  errors: errorReducer,
  sucMsg: sucMsgReducer,
});

export default Reducers;
