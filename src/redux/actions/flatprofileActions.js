import { updateProfile } from './updateActions';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';

const postFlatprofileRequest = () => ({
    type: Constants.POST_FLATPROFILE_REQUEST,
});

const postFlatprofileSuccess = (response) => ({
    type: Constants.POST_FLATPROFILE_SUCCESS,
    payload: response,
});

const postFlatprofileFailure = (error) => ({
    type: Constants.POST_FLATPROFILE_FAILURE,
    payload: error,
});

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
            console.log('\nflatprofile error');
            console.log(error);
            dispatch(getAllFlatprofilesFailure(error));
        });
};

/**
 * sends a postRequest to backend api to create a Flat belonging to the user that makes the request
 * @param {object} requestBody - the body of the postRequest
 * @dispatches {@link postFlatprofileRequest} on post request start
 * @dispatches {@link postFlatprofileSuccess} on post success with response payload
 * @dispatches {@link postFlatprofileFailure} on post failure with error payload
 */
export const postFlatprofile = (requestBody) => (dispatch) => {
    dispatch(postFlatprofileRequest());

    dispatch({
        type: Constants.LOADING_STATE,
    });
    let references = requestBody.pictureReferences;
    delete requestBody.pictureReferences;

    console.log('requestBody:');
    console.log(requestBody);
    apiClient()
        .post('/flatprofiles', requestBody)
        .then((response) => {
            console.log(
                'postFlatprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(postFlatprofileSuccess(response.data));
            let update = { pictureReferences: references };
            dispatch(
                updateProfile(update, 'flatprofile', response.data.profileId)
            );
        })
        .catch((error) => {
            console.log('error post flatprofile');
            dispatch(postFlatprofileFailure(error));
        });
};
