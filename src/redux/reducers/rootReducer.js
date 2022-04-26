import { combineReducers } from 'redux';
import userprofileState from './userprofileState';
import authState from './authState';
import flatprofileState from './flatprofileState';
import errorState from './errorState';
import transitState from './transitState';
import loadingState from './loadingState';
import chatState from './chatState';
import discoverState from './discoverState';
/**
 * comines reducers together to create a single reducer
 * @see {@link combineReducers}
 */
const rootReducer = combineReducers({
    userprofileState,
    flatprofileState,
    authState,
    errorState,
    transitState,
    loadingState,
    chatState,
    discoverState,
});

export default rootReducer;
