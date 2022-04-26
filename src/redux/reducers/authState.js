import * as Constants from '../constants';

const initialState = {
    auth: {},
    loggedIn: false,
};

/**
 * reducer for authState: handles auth responses from firebase directly
 * @param {state} initialState
 * @param {*} action
 */
const authState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                auth: action.payload,
                loggedIn: true,
            };

        case Constants.LOGIN_USER_FAILURE:
            return {
                ...state,
                auth: action.payload,
                loggedIn: false,
            };

        case Constants.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                auth: {},
                loggedIn: false,
            };

        default:
            return state;
    }
};

export default authState;
