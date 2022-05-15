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
    const flat = { ...requestBody };

    delete flat.pictureReferences;
    delete flat.roommateEmails;

    console.log('post flat requestBody:');
    console.log(flat);
    return apiClient()
        .post('/flatprofiles', flat)
        .then((response) => {
            console.log(
                'postFlatprofileSuccess: ' + JSON.stringify(response.data)
            );
            return Promise.resolve(
                dispatch(postFlatprofileSuccess(response.data))
            );
        })
        .catch((error) => {
            console.log('error post flatprofile');
            return Promise.resolve(dispatch(postFlatprofileFailure(error)));
        });
};

export const postRoommateToFlat = (email) => (dispatch) => {
    dispatch(postRoommateToFlatRequest());
    return apiClient()
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
