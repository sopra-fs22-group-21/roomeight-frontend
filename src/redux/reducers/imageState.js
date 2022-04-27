import * as Constants from '../constants';

const initialState = {
    userprofile: {
        localPictureReferences: [],
        pictureReferences: [],
        loading: false,
    },
    flatprofile: {
        localPictureReferences: [],
        pictureReferences: [],
        loading: false,
    },
};

const transitState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_LOCAL_PICTURE_REFERENCES_USER:
            return {
                ...state,
                userprofile: {
                    ...state.userprofile,
                    localPictureReferences: action.payload,
                },
                loading: false,
            };

        case Constants.SET_LOCAL_PICTURE_REFERENCES_FLAT:
            return {
                ...state,
                flatprofile: {
                    ...state.flatprofile,
                    localPictureReferences: action.payload,
                },
                loading: false,
            };

        case Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE:
            return {
                ...state,
                userprofile: {
                    ...state.userprofile,
                    localpictureReferences: undefined,
                    pictureReferences: [
                        ...state.pictureReferences,
                        action.payload,
                    ],
                },
                loading: false,
            };

        case Constants.UPLOAD_IMAGE_SUCCESS_FLATPROFILE:
            return {
                ...state,
                flatprofile: {
                    localpictureReferences: undefined,
                    pictureReferences: [
                        ...state.pictureReferences,
                        action.payload,
                    ],
                },
                loading: false,
            };

        default:
            return state;
    }
};

export default transitState;
