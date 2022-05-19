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
        case Constants.GET_DISCOVER_PROFILES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Constants.GET_DISCOVER_PROFILES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case Constants.GET_DISCOVER_PROFILES_SUCCESS:
            const newProfiles = action.payload.map(
                (data) => new Userprofile(data)
            )
            const newIds = newProfiles.map((profile) => profile.profileId)
            const currentWithoutNew = state.discoverProfiles.filter((profile) => (!newIds.includes(profile.profileId)))
            const updatedProfiles = currentWithoutNew.concat(newProfiles)
            return {
                ...state,
                error: undefined,
                discoverProfiles: updatedProfiles,
                loading: false,
            };

        case Constants.UPDATE_DISCOVER_PROFILES:
            return {
                ...state,
                discoverProfiles: action.payload.map(
                    (data) => new Userprofile(data)
                ),
            };

        case Constants.POST_LIKE_FLAT_SUCCESS:
        case Constants.POST_LIKE_USER_SUCCESS:
        // todo: jordi : case Constants.NEW_MATCH:
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
