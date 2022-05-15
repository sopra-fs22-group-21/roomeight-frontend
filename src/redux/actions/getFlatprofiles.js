import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { updateDiscoverProfiles } from './discoverActions';

const getFlatprofileRequest = () => ({
    type: Constants.GET_FLATPROFILE_REQUEST,
});

export const getFlatprofileSuccess = (response) => ({
    type: Constants.GET_FLATPROFILE_SUCCESS,
    payload: response,
});

const getFlatprofileFailure = (error) => ({
    type: Constants.GET_FLATPROFILE_FAILURE,
    payload: error,
});

const getAllFlatprofilesRequest = (request) => ({
    type: Constants.GET_ALL_FLATPROFILES_REQUEST,
    payload: request,
});
const getAllFlatprofilesSuccess = (response) => ({
    type: Constants.GET_ALL_FLATPROFILES_SUCCESS,
    payload: response,
});
const getAllFlatprofilesFailure = (error) => ({
    type: Constants.GET_ALL_FLATPROFILES_FAILURE,
    payload: error,
});

/**
 * makes a request to the backend api to get the current userprofile
 * @params {string} userId the uid of a user to set as pathvariable
 * @dispatches {@link getMatchesRequest} on request start
 * @dispatches {@link getCurrentUserprofileSuccess} on request success with userprofile payload
 * @dispatches {@link getMatchesFailure} on request failure with error payload
 */
export const getFlatprofile = (id) => (dispatch) => {
    dispatch(getFlatprofileRequest());
    let flatprofile = {};
    apiClient()
        .get(`/flatprofiles/${id}`)
        .then((response) => {
            dispatch(getFlatprofileSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getFlatprofileFailure(error));
        });
};

/**
 * makes a request to the backend api to get all flatprofiles
 * @dispatches {@link getAllFlatprofilesRequest} on request start
 * @dispatches {@link getAllFlatprofilesSuccess} on request success with userprofile payload
 * @dispatches {@link getAllFlatprofilesFailure} on request failure with error payload
 */
export const getAllFlatProfiles = () => (dispatch, getState) => {
    const url = '/flatprofiles/';
    dispatch(getAllFlatprofilesRequest());
    apiClient()
        .get(url)
        .then((response) => {
            dispatch(getAllFlatprofilesSuccess(response.data));
            dispatch(
                updateDiscoverProfiles(
                    response.data.filter(
                        (profile) =>
                            !Object.keys(
                                getState().matchesState.matches
                            ).includes(profile.profileId)
                    )
                )
            );
        })
        .catch((error) => {
            console.log('\nflatprofile error');
            console.log(error);
            dispatch(getAllFlatprofilesFailure(error));
        });
};
