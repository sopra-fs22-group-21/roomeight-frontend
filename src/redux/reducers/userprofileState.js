import * as Constants from '../constants';

const initialState = {
    userprofile: {},
};

//TODO: error handling -> really set to null on every success?
/**
 * reducer for the userprofile state
 *
 * @param {object} initialState
 * @param {reduxAction} action action that got dispatched
 */
const userprofileState = (state = initialState, action) => {
    const profile = { ...action.payload };
    switch (action.type) {
        case Constants.GET_CURRENT_USER_SUCCESS:
            delete profile.matches;
            return {
                ...state,
                userprofile: profile,
                update: undefined,
            };
        case Constants.POST_LIKE_FLAT_SUCCESS:
            return {
                ...state,
                //todo: userprofile: action.payload.updatedUserProfile,
            };

        case Constants.POST_USERPROFILE_SUCCESS:
            delete profile.matches;
            return {
                ...state,
                userprofile: profile,
            };

        case Constants.UPDATE_USERPROFILE_SUCCESS:
            delete profile.matches;
            return {
                ...state,
                update: profile,
            };
        case Constants.GET_CURRENT_USER_FAILURE:
        case Constants.GET_DOWNLOAD_URL_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default userprofileState;
