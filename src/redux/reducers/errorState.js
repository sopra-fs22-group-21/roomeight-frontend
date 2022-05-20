import en from '../../resources/strings/en.json';
import * as Constants from '../constants';

const initialState = {
    request: {},
    authErrors: {},
    userprofileErrors: {},
    flatprofileErrors: {},
    transitErrors: {},
    discoverErrors: {},
};

/**
 * reducer for the error state: handles every incomming error from a failure and sets the error messages
 * every action which has to make an outside request that can fail will be handled here in case of error and reset in case of success.
 * @param {*} initialState
 * @param {*} action
 */
const errorState = (state = initialState, action) => {
    let info = undefined;
    switch (action.type) {
        case Constants.API_CLIENT_REQUEST:
            return {
                ...state,
                request: action.payload,
            };
        case Constants.LOGIN_USER_FAILURE:
            if (action.payload.code.includes('user-not-found'))
                info = en.errors.userWithEmailNotFound;
            else info = en.errors.wrongPassword;
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    login: action.payload,
                    infoForUser: info,
                },
            };

        case Constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                authErrors: {
                    ...state.authErrors,
                    login: undefined,
                    infoForUser: undefined,
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
                    infoForUser: undefined,
                },
            };

        case Constants.GET_CURRENT_USER_FAILURE:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    getCurrentUser: action,
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
            const pjson = JSON.stringify(action.payload);
            const payload = JSON.parse(pjson);
            if (payload.status == 409) info = en.errors.userAlreadyExists;
            else if (payload.status == 500) info = en.errors.serverError;
            else info = en.errors.problemWithApplication;
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    postUserProfile: action.payload,
                    infoForUser: info,
                },
            };

        case Constants.POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                userprofileErrors: {
                    ...state.userprofileErrors,
                    postUserProfile: undefined,
                    infoForUser: undefined,
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

        case Constants.UPDATE_FLATPROFILE_FAILURE:
            return {
                ...state,
                flatprofileErrors: {
                    ...state.flatprofileErrors,
                    updateFlatprofile: action.payload,
                },
            };

        case Constants.UPDATE_FLATPROFILE_SUCCESS:
            return {
                ...state,
                flatprofileErrors: {
                    ...state.flatprofileErrors,
                    updateFlatprofile: undefined,
                },
            };

        case Constants.POST_ROOMMATE_TO_FLAT_FAILURE:
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

        case Constants.POST_LIKE_FLAT_FAILURE:
        case Constants.POST_LIKE_USER_FAILURE:
            return {
                ...state,
                discoverErrors: {
                    ...state.discoverErrors,
                    like: action.payload,
                },
            };

        case Constants.GET_DISCOVER_PROFILES_FAILURE:
            return {
                ...state,
                discoverErrors: {
                    ...state.discoverErrors,
                    discover: action.payload,
                },
            };

        case Constants.GET_DISCOVER_PROFILES_SUCCESS:
            return {
                ...state,
                discoverErrors: {},
            };
        default:
            return state;
    }
};

export default errorState;
