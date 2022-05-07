import Flatprofile from '../../models/Flatprofile';
import Userprofile from '../../models/Userprofile';
import * as Constants from '../constants';

const initialState = {
    discoverProfiles: [],
    loading: false,
    newMatch: null,
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
        case Constants.GET_ALL_FLATPROFILES_REQUEST:
        case Constants.GET_ALL_USERPROFILES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_ALL_USERPROFILES_FAILURE:
        case Constants.GET_ALL_FLATPROFILES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case Constants.GET_ALL_USERPROFILES_SUCCESS:
        case Constants.GET_ALL_FLATPROFILES_SUCCESS:
            return {
                ...state,
                error: undefined,
                loading: false,
            };

        case Constants.UPDATE_DISCOVER_PROFILES:
            return {
                ...state,
                discoverProfiles: action.payload.map(
                    (data) => new Userprofile(data)
                ),
                loading: false,
            };

        case Constants.POST_LIKE_FLAT_SUCCESS:
        case Constants.POST_LIKE_USER_SUCCESS:
            if (action.payload.isMatch) {
                return {
                    ...state,
                    newMatch: action.payload.profileId,
                };
            } else return state;

        case Constants.MATCH_IS_VIEWED:
            return {
                ...state,
                newMatch: null,
            };

        default:
            return state;
    }
};
export default userprofileState;
