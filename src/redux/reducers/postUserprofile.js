import {
    POST_USERPROFILE_REQUEST,
    POST_USERPROFILE_SUCCESS,
    POST_USERPROFILE_FAILURE,
} from '../constants/index';


const initialState = {
    userProfile: {},
    loading: true,
    error: null,
};

const postUserprofile = (state = initialState, action) => {
    switch (action.type) {
        case POST_USERPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                userProfile: action.payload,
                loading: false,
            };
        case POST_USERPROFILE_FAILURE:
            return {
                ...state,
                userProfile: {},
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export default postUserprofile;