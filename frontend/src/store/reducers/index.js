import { combineReducers } from "redux";
import token from "./token";

const rootReducer = combineReducers({
  token: token,
});

export default rootReducer;
