import * as Constants from '../constants';

const initialState = {
    auth: {},
    loggedIn: false,
    loading: true,
};

/**
 * reducer for authState: handles auth responses from firebase directly
 * @param {state} initialState
 * @param {*} action
 */
const authState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.LOGIN_USER_REQUEST:
        case Constants.LOGOUT_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case Constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                auth: action.payload,
                loggedIn: true,
                loading: false,
            };

        case Constants.LOGIN_USER_FAILURE:
            return {
                ...state,
                auth: action.payload,
                loggedIn: false,
                loading: false,
            };

        case Constants.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                auth: {},
                loggedIn: false,
                loading: false,
            };

        default:
            return state;
    }
};

export default authState;
