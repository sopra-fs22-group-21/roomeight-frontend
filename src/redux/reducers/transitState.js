import * as Constants from '../constants';

const initialState = {
    transitUserprofile: {
        pictureReferences: [],
    },
    transitFlatprofile: {
        pictureReferences: [],
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
                    localpictureReferences: undefined,
                    pictureReferences: [
                        ...state.transitUserprofile.pictureReferences,
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
                    localpictureReferences: undefined,
                    pictureReferences: [
                        ...state.transitFlatprofile.pictureReferences,
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
