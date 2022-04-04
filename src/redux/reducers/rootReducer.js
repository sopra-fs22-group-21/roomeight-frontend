import { combineReducers } from "redux";
import userProfilesReducer from "./userProfilesReducer";

const rootReducer = combineReducers({
  userProfilesReducer,
});

export default rootReducer;
