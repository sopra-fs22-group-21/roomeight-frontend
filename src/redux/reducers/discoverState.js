import Flatprofile from '../../models/Flatprofile';
import Userprofile from '../../models/Userprofile';
import * as Constants from '../constants';

const initialState = {
    discoverProfiles: [],
    lastLiked: null,
    newIncompleteMatch: null,
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
            const newProfiles = action.payload.map(
                (data) => new Userprofile(data)
            );
            const newIds = newProfiles.map((profile) => profile.profileId);
            const currentWithoutNew = state.discoverProfiles.filter(
                (profile) => !newIds.includes(profile.profileId)
            );
            const updatedProfiles = currentWithoutNew
                .concat(newProfiles)
                .filter(
                    (profile) =>
                        !state.lastViewedIds.includes(profile.profileId)
                );
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

        case Constants.POST_LIKE_SUCCESS:
            const last = [...state.lastViewedIds, action.payload.profileId];
            return {
                ...state,
                lastViewedIds: last,
                lastLiked: action.payload.profileId,
            };

        case Constants.MATCH_IS_VIEWED:
            return {
                ...state,
                lastLiked: null,
                newIncompleteMatch: null,
            };

        case Constants.GET_USERPROFILE_SUCCESS:
        case Constants.UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default userprofileState;
