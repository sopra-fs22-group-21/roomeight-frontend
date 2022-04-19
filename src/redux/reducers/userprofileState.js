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
    switch (action.type) {
        case Constants.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                userprofile: action.payload,
            };

        case Constants.POST_USERPROFILE_SUCCESS:
            return {
                ...state,
                userprofile: action.payload,
            };

        case Constants.UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                userprofile: action.payload,
            };

        default:
            return state;
    }
};
export default userprofileState;
