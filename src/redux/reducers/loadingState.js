import * as Constants from '../constants';

const initialState = {
    loading: false,
};

/**
 * reducer for authState: handles auth responses from firebase directly
 * @param {state} initialState
 * @param {*} action
 */
const loadingState = (state = initialState, action) => {
    switch (action.type) {
        //All request start types that set loading to true
        case Constants.GET_CURRENT_USER_REQUEST:
        case Constants.GET_FLATPROFILE_REQUEST:
        case Constants.UPDATE_USERPROFILE_REQUEST:
        case Constants.UPDATE_FLATPROFILE_REQUEST:
        case Constants.POST_USERPROFILE_REQUEST:
        case Constants.POST_FLATPROFILE_REQUEST:
        case Constants.LOGOUT_USER_REQUEST:
        case Constants.LOGIN_USER_REQUEST:

        case Constants.UPLOAD_IMAGE_REQUEST_USERPROFILE:
        case Constants.UPLOAD_IMAGE_REQUEST_FLATPROFILE:

        case Constants.LOADING_STATE:
            return {
                loading: true,
            };

        //All request end types that set loading to false
        case Constants.LOGIN_USER_SUCCESS:
        case Constants.LOGIN_USER_FAILURE:
        case Constants.LOGOUT_USER_SUCCESS:
        case Constants.LOGOUT_USER_FAILURE:

        case Constants.GET_CURRENT_USER_SUCCESS:
        case Constants.GET_CURRENT_USER_FAILURE:
        case Constants.POST_USERPROFILE_SUCCESS:
        case Constants.POST_USERPROFILE_FAILURE:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_FAILURE:

        case Constants.POST_FLATPROFILE_SUCCESS:
        case Constants.POST_FLATPROFILE_FAILURE:

        case Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE:
        case Constants.UPLOAD_IMAGE_FAILURE_USERPROFILE:

        case Constants.UPLOAD_IMAGE_SUCCESS_FLATPROFILE:
        case Constants.UPLOAD_IMAGE_FAILURE_FLATPROFILE:
            return {
                loading: false,
            };

        default:
            return state;
    }
};

export default loadingState;
