import * as Constants from '../constants';

const initialState = {
    enterAppLoading: true,
};

/**
 * reducer for authState: handles auth responses from firebase directly
 * @param {state} initialState
 * @param {*} action
 */
const userState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.LOGIN_USER_SUCCESS:
        case Constants.LOGOUT_USER_REQUEST:
        case Constants.ENTER_APP_LOADING:
            return {
                ...state,
                enterAppLoading: true,
            };

        case Constants.LOGOUT_USER_FAILURE:
        case Constants.LOGIN_USER_SUCCESS:
        case Constants.GET_CURRENT_USER_SUCCESS:
        case Constants.GET_CURRENT_USER_FAILURE:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_FAILURE:
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
        case Constants.UPDATE_FLATPROFILE_FAILURE:
            return {
                ...state,
                enterAppLoading: false,
            };

        default:
            return state;
    }
};

export default userState;
