import * as Constants from '../constants';

const initialState = {
    transitUserprofile: {},
    transitFlatprofile: {},
};

const transitState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_TRANSIT_ATTRIBUTES_USERPROFILE:
            return {
                ...state,
                transitUserprofile: {
                    ...state.transitUserprofile,
                    ...action.payload,
                },
            };
        case Constants.SET_TRANSIT_ATTRIBUTES_FLATPROFILE:
            return {
                ...state,
                transitFlatprofile: {
                    ...state.transitFlatprofile,
                    ...action.payload,
                },
            };
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
            return {
                ...state,
                transitFlatprofile: {},
            };

        //case Constants.POST_FLATPROFILE_SUCCESS:
        case Constants.POST_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                transitUserprofile: {},
            };

        default:
            return state;
    }
};

export default transitState;
