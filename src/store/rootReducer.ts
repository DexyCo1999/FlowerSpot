import { combineReducers } from "redux";
import loginReducer from "./auth/reducer";

export default combineReducers ({
    loginReducer: loginReducer
});