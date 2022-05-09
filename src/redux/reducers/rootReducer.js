import { combineReducers } from 'redux';
import * as Constants from '../constants';
import authState from './authState';
import chatState from './chatState';
import discoverState from './discoverState';
import errorState from './errorState';
import flatprofileState from './flatprofileState';
import loadingState from './loadingState';
import matchesState from './matchesState';
import transitState from './transitState';
import userprofileState from './userprofileState';
import likesState from './likesState';
/**
 * comines reducers together to create a single reducer
 * @see {@link combineReducers}
 */

const combinedReducer = combineReducers({
    userprofileState,
    flatprofileState,
    authState,
    errorState,
    transitState,
    loadingState,
    chatState,
    discoverState,
    matchesState,
    likesState,
});

const rootReducer = (state, action) => {
    if (action.type == Constants.LOGOUT_USER_SUCCESS) {
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

export default rootReducer;
