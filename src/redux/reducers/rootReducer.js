import { combineReducers } from 'redux';
import userprofileState from './userprofileState';
import authState from './authState';
import flatprofileState from './flatprofileState';
import errorState from './errorState';
import transitState from './transitState';
import loadingState from './loadingState';
import chatState from './chatState';
import imageState from './imageState';
import discoverState from './discoverState';
import * as Constants from '../constants';
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
    imageState,
});

const rootReducer = (state, action) => {
    if (action.type == Constants.LOGOUT_USER_SUCCESS) {
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

export default rootReducer;
