import { combineReducers } from "redux";
// import reducer here
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import sucMsgReducer from "./sucMsg.reducer";
import profileReducer from "./profile.reducer";
import questionReducer from "./question.reducer";

const Reducers = combineReducers({
  //add reducer here
  auth: authReducer,
  errors: errorReducer,
  sucMsg: sucMsgReducer,
  profile: profileReducer,
  question: questionReducer,
});

export default Reducers;
