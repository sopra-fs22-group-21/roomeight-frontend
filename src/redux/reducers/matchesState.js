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
        case Constants.GET_FLATPROFILE_SUCCESS:
            return {
                ...state,
                matches: action.payload.matches,
            };

        default:
            return state;
    }
};
export default matchesState;
