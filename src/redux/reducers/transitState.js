import * as Constants from '../constants';

const initialState = {
    transitUserprofile: {
        pictureReference: [],
    },
    transitFlatprofile: {
        pictureReference: [],
    },
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

        case Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE:
            return {
                ...state,
                transitUserprofile: {
                    ...state.transitUserprofile,
                    localPictureReference: undefined,
                    pictureReference: [
                        ...state.transitUserprofile.pictureReference,
                        action.payload,
                    ],
                },
            };

        case Constants.UPLOAD_IMAGE_SUCCESS_FLATPROFILE:
            return {
                ...state,
                transitFlatprofile: {
                    ...state.transitFlatprofile,
                    localPictureReference: undefined,
                    pictureReference: [
                        ...state.transitFlatprofile.pictureReference,
                        action.payload,
                    ],
                },
            };

        case Constants.POST_FLATPROFILE_SUCCESS:
        case Constants.POST_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
            return {
                ...state,
                transitUserprofile: {},
                transitFlatprofile: {},
            };

        default:
            return state;
    }
};

export default transitState;
