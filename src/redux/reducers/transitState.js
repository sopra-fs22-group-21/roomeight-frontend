import * as Constants from '../constants';

const initialState = {
    transitUserprofile: {
        pictureReference: [],
    },
    transitFlatprofile: {
        pictureReference: [],
    },
    profileCompletionStatus: {},
};

const transitState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                profileCompletionStatus: {
                    isSingleRoomie: false,
                    isFlat: false,
                    joinsFlat: false,
                    isComplete: false,
                },
            };
        case Constants.SET_TRANSIT_ATTRIBUTES_USERPROFILE:
            return {
                ...state,
                transitUserprofile: {
                    ...state.transitUserprofile,
                    ...action.payload,
                },
                profileCompletionStatus: {
                    ...state.profileCompletionStatus,
                    ...action.completionStatus,
                    isComplete: false,
                },
            };
        case Constants.SET_TRANSIT_ATTRIBUTES_FLATPROFILE:
            return {
                ...state,
                transitFlatprofile: {
                    ...state.transitFlatprofile,
                    ...action.payload,
                },
                profileCompletionStatus: {
                    ...state.profileCompletionStatus,
                    ...action.completionStatus,
                    isComplete: false,
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
                profileCompletionStatus: {
                    ...state.profileCompletionStatus,
                    ...action.completionStatus,
                    isComplete: false,
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
                profileCompletionStatus: {
                    ...state.profileCompletionStatus,
                    ...action.completionStatus,
                    isComplete: false,
                },
            };

        case Constants.POST_FLATPROFILE_SUCCESS:
        case Constants.POST_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
        case Constants.UPDATE_FLATPROFILE_SUCCESS:
            return {
                ...state,
                profileCompletionStatus: { isComplete: true },
                transitUserprofile: {},
                transitFlatprofile: {},
            };

        default:
            return state;
    }
};

export default transitState;
