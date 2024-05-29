import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  taskDetailsReducers,
  taskListReducers,
} from "./reducers/tasksReducers";
import { userSignupReducers, userLoginReducers } from "./reducers/userReducers";

const reducer = combineReducers({
  tasksList: taskListReducers,
  taskDetails: taskDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
});

const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)) // Passing thunk directly
);

export default store;
