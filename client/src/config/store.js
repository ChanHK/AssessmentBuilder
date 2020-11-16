import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../reducers";

const initialState = {};
const middleWare = [thunk];
// const configureStore = createStore(
//   reducers,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleWare))
// );

const configureStore = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
