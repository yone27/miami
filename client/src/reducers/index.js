import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  page: pageReducer,
  auth: authReducer,
  errors: errorReducer
});
