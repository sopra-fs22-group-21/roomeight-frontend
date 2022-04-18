import { combineReducers } from 'redux';
import userprofileState from './userprofileState';

/**
 * comines reducers together to create a single reducer
 * @see {@link combineReducers}
 */
const rootReducer = combineReducers({
    userprofileState,
});

export default rootReducer;
