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
} from '../constants/index';

const initialState = {
    userProfile: {
        userId: '',
        userToken: '',
    },
    loading: true,
    error: null,
};

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
                    userId: action.payload.uid,
                    userToken: action.payload.accessToken,
                },
                loading: false,
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userprofileState;
