import { combineReducers } from 'redux';
import userProfilesReducer from './userProfilesReducer';
import postUserprofileReducer from './postUserprofileReducer';

const rootReducer = combineReducers({
    userProfilesReducer,
    postUserprofileReducer,
});

export default rootReducer;
