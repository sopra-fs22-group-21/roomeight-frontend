import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile } from './getFlatprofiles';
import { updateProfile } from './updateActions';

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

const postRoommateToFlatRequest = () => ({
    type: Constants.POST_ROOMMATE_TO_FLAT_REQUEST,
});

const postRoommateToFlatSuccess = (response) => ({
    type: Constants.POST_ROOMMATE_TO_FLAT_SUCCESS,
    payload: response,
});

const postRoommateToFlatFailure = (error) => ({
    type: Constants.POST_ROOMMATE_TO_FLAT_FAILURE,
    payload: error,
});

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

    let emails = requestBody.roommateEmails;
    delete requestBody.roommateEmails;

    console.log('requestBody:');
    console.log(requestBody);
    return apiClient()
        .post('/flatprofiles', requestBody)
        .then((response) => {
            console.log(
                'postFlatprofileSuccess: ' + JSON.stringify(response.data)
            );
            return dispatch(postFlatprofileSuccess(response.data));
        })
        .catch((error) => {
            console.log('error post flatprofile');
            dispatch(postFlatprofileFailure(error));
        })
        .then((response) => {
            let update = { pictureReferences: references };
            return dispatch(
                updateProfile(update, 'flatprofile', response.data.profileId)
            ).catch((error) => console.log('error uploading'));
        })
        .then((response) => {
            return Promise.all(
                emails.map((email) => {
                    return dispatch(postRoommateToFlat(email));
                })
            ).catch((error) => console.log('error posting roommates ' + error));
        });
};

export const postRoommateToFlat = (email) => (dispatch) => {
    dispatch(postRoommateToFlatRequest());
    apiClient()
        .post(`/flatprofiles/roommate/${email}`, {})
        .then((response) => {
            console.log('could add roommate with email ' + email);
            console.log(JSON.stringify(response.data));

            dispatch(postRoommateToFlatSuccess(response.data));
            dispatch(getFlatprofile());
        })
        .catch((error) => {
            console.log('error post flatprofile');
            dispatch(postRoommateToFlatFailure(error));
        });
};
