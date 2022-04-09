import {
    POST_USERPROFILE_REQUEST,
    POST_USERPROFILE_SUCCESS,
    POST_USERPROFILE_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOADING_STATE,
} from '../constants/index';

const initialState = {
    userProfile: {},
    loading: false,
    error: null,
};

//TODO: error handling -> really set to null on every success?

const userprofileState = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: action.payload,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case POST_USERPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    details: action.payload,
                },
                error: null,
                loading: false,
            };
        case POST_USERPROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    auth: action.payload,
                },
                error: null,
                loading: false,
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                error: null,
                userProfile: {},
                loading: false,
            };
        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case LOADING_STATE:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
export default userprofileState;
