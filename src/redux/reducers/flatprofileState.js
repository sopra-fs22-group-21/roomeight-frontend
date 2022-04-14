import {
    COMPLETE_FLATPROFILE_REQUEST,
    COMPLETE_FLATPROFILE_SUCCESS,
    COMPLETE_FLATPROFILE_FAILURE,
} from '../constants/index';

const flatprofileState = (state = initialState, action) => {
    switch (action.type) {
        case COMPLETE_FLATPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COMPLETE_FLATPROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                userProfile: {},
                isComplete: true,
                loading: false,
            };
        case COMPLETE_FLATPROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};
export default flatprofileState;
