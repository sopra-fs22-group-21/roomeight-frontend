import apiClient from '../../helper/apiClient';
import { loadImagesToProfile } from '../../helper/imageHandler';
import * as Constants from '../constants';

const getFlatprofileRequest = () => ({
    type: Constants.GET_FLATPROFILE_REQUEST,
});

const getFlatprofileSuccess = (response) => ({
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
            flatprofile = response.data;
            dispatch(getFlatprofileSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getFlatprofileFailure(error));
        })
        .then(() => {
            return loadImagesToProfile(flatprofile);
        })
        .then((profile) => {
            if (profile.images.length > 0)
                dispatch(getFlatprofileSuccess(profile));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getDownloadURLFailure(error));
        })
        .then(() => {
            return Promise.all(
                flatprofile.roomMates.map((profile) =>
                    loadImagesToProfile(profile)
                )
            );
        })
        .catch((error) => {
            dispatch(getDownloadURLFailure(error));
        })
        .then((profiles) => {
            flatprofile.roomMates = profiles;
            dispatch(getAllFlatprofilesSuccess(flatprofile));
        });
};

/**
 * makes a request to the backend api to get all flatprofiles
 * @dispatches {@link getAllFlatprofilesRequest} on request start
 * @dispatches {@link getAllFlatprofilesSuccess} on request success with userprofile payload
 * @dispatches {@link getAllFlatprofilesFailure} on request failure with error payload
 */
export const getAllFlatProfiles = () => (dispatch) => {
    const url = '/flatprofiles/';
    dispatch(getAllFlatprofilesRequest());
    let flatprofiles = [];
    apiClient()
        .get(url)
        .then((response) => {
            flatprofiles = response.data;
            dispatch(getAllFlatprofilesSuccess(response.data));
        })
        .catch((error) => {
            console.log('\nflateprofile error');
            console.log(error);
            dispatch(getAllFlatprofilesFailure(error));
        })
        .then(() => {
            return Promise.all(
                flatprofiles.map((flatprofile) =>
                    loadImagesToProfile(flatprofile)
                )
            );
        })
        .catch((error) => {
            dispatch(getDownloadURLFailure(error));
        })
        .then((profiles) => {
            flatprofiles = profiles;
            dispatch(getAllFlatprofilesSuccess(profiles));
        })
        .then(() => {
            return Promise.all(
                flatprofiles.map((flatprofile) =>
                    Promise.all(
                        flatprofile.roomMates.map((roomie) =>
                            loadImagesToProfile(roomie)
                        )
                    )
                )
            );
        })
        .catch((error) => {
            dispatch(getDownloadURLFailure(error));
        })
        .then((roomies) => {
            const updated = flatprofiles.map((profile, index) => {
                profile.roomMates = roomies[index];
                return profile;
            });
            dispatch(getAllFlatprofilesSuccess(updated));
        });
};
