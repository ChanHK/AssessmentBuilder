import { combineReducers } from "redux";
// import reducer here
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import sucMsgReducer from "./sucMsg.reducer";
import profileReducer from "./profile.reducer";

const Reducers = combineReducers({
  //add reducer here
  auth: authReducer,
  errors: errorReducer,
  sucMsg: sucMsgReducer,
  profile: profileReducer,
});

export default Reducers;
