import * as Constants from '../constants';
import Userprofile from '../../models/Userprofile';
import Flatprofile from '../../models/Flatprofile';

const initialState = {
    discoverProfiles: [],
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
        case Constants.GET_ALL_USERPROFILES_SUCCESS:
            return {
                ...state,
                discoverProfiles: action.payload.map(
                    (data) => new Userprofile(data)
                ),
            };

        case Constants.GET_ALL_FLATPROFILES_SUCCESS:
            return {
                ...state,
                discoverProfiles: action.payload.map(
                    (data) => new Flatprofile(data)
                ),
            };

        default:
            return state;
    }
};
export default userprofileState;
