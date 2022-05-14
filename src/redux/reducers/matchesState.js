import * as Constants from '../constants';

const initialState = {
    matches: [],
};

//TODO: error handling -> really set to null on every success?
/**
 * reducer for the userprofile state
 *
 * @param {object} initialState
 * @param {reduxAction} action action that got dispatched
 */
const matchesState = (state = initialState, action) => {
    switch (action.type) {
        case Constants.GET_CURRENT_USER_SUCCESS:
            if (action.payload.isSearchingRoom) {
                return {
                    ...state,
                    matches: action.payload.matches,
                };
            } else return state;
        case Constants.NEW_MATCH:
            return {
                ...state,
                matches: {
                    ...state.matches,
                    [action.payload.profileId]: action.payload,
                },
            };
        case Constants.GET_FLATPROFILE_SUCCESS:
            return {
                ...state,
                matches: action.payload.matches,
            };

        case Constants.POST_LIKE_FLAT_SUCCESS:
            if (action.payload.isMatch) {
                return {
                    ...state,
                    matches: action.payload.updatedUserProfile.matches,
                };
            } else return state;

        case Constants.POST_LIKE_USER_SUCCESS:
            if (action.payload.isMatch) {
                return {
                    ...state,
                    matches: action.payload.updatedFlatProfile.matches,
                };
            } else return state;

        default:
            return state;
    }
};
export default matchesState;
