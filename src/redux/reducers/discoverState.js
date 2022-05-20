import Flatprofile from '../../models/Flatprofile';
import Userprofile from '../../models/Userprofile';
import * as Constants from '../constants';

const initialState = {
    discoverProfiles: [],
    newMatch: null,
    lastViewedIds: [],
    loading: true,
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
        case Constants.GET_USERPROFILE_REQUEST:
        case Constants.UPDATE_USERPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case Constants.GET_DISCOVER_PROFILES_SUCCESS:
            const newProfiles = action.payload
                .map((data) => new Userprofile(data))
                .filter(
                    (profile) =>
                        !state.lastViewedIds.includes(profile.profileId)
                );
            const newIds = newProfiles.map((profile) => profile.profileId);
            const currentWithoutNew = state.discoverProfiles.filter(
                (profile) => !newIds.includes(profile.profileId)
            );
            const updatedProfiles = currentWithoutNew.concat(newProfiles);
            return {
                ...state,
                error: undefined,
                discoverProfiles: updatedProfiles,
                lastViewedIds: [],
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

        case Constants.RELOAD_DISCOVER_PROFILES:
            return {
                ...state,
                discoverProfiles: [],
                loading: true,
            };
        case Constants.POST_DISLIKE_SUCCESS:
            return {
                ...state,
                lastViewedIds: [
                    ...state.lastViewedIds,
                    action.payload.profileId,
                ],
            };

        case Constants.POST_LIKE_FLAT_SUCCESS:
        case Constants.POST_LIKE_USER_SUCCESS:
            // todo: jordi : case Constants.NEW_MATCH:
            newState = {
                ...state,
                lastViewedIds: [
                    ...state.lastViewedIds,
                    action.payload.profileId,
                ],
            };
            if (action.payload.isMatch) {
                return {
                    ...newState,
                    newMatch: action.payload.profileId,
                };
            } else return newState;

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
