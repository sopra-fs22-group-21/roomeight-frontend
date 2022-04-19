import * as Constants from '../constants';

const initialState = {
    authErrors: {},
    userprofileErrors: {},
    flatprofileErrors: {},
    transitErrors: {},
};

/**
 * reducer for the error state: handles every incomming error from a failure and sets the error messages
 * every action which has to make an outside request that can fail will be handled here in case of error and reset in case of success.
 * @param {*} initialState
 * @param {*} action
 */
const errorState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.LOGIN_USER_FAILURE:
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    login: action.payload,
                },
            };

        case Constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    login: undefined,
                },
            };

        case Constants.LOGOUT_USER_FAILURE:
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    logout: action.payload,
                },
            };

        case Constants.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    logout: undefined,
                },
            };

        case Constants.GET_CURRENT_USER_FAILURE:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    getCurrentUser: action.payload,
                },
            };

        case Constants.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    getCurrentUser: undefined,
                },
            };

        case Constants.POST_USERPROFILE_FAILURE:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    postUserProfile: action.payload,
                },
            };

        case Constants.POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    postUserProfile: undefined,
                },
            };

        case Constants.UPDATE_USERPROFILE_FAILURE:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    completeUserProfile: action.payload,
                },
            };

        case Constants.UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    completeUserProfile: undefined,
                },
            };

        case Constants.POST_FLATPROFILE_FAILURE:
            return {
                ...state,
                flatprofileErrors: {
                    ...state.flatprofileErrors,
                    completeFlatProfile: action.payload,
                },
            };

        case Constants.POST_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofileErrors: {
                    ...state.flatprofileErrors,
                    completeFlatProfile: undefined,
                },
            };

        case Constants.UPLOAD_IMAGE_FAILURE_USERPROFILE:
            return {
                ...state,
                transitErrors: {
                    ...state.transitErrors,
                    uploadImage: action.payload,
                },
            };
        case Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE:
            return {
                ...state,
                transitErrors: {
                    ...state.transitErrors,
                    uploadImage: undefined,
                },
            };

        default:
            return state;
    }
};

export default errorState;
