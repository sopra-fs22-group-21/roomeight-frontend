import React from 'react';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { loginUser } from './authActions';

const postUserprofileRequest = () => ({
    type: Constants.POST_USERPROFILE_REQUEST,
});

const postUserprofileSuccess = (response) => ({
    type: Constants.POST_USERPROFILE_SUCCESS,
    payload: response,
});

const postUserprofileFailure = (error) => ({
    type: Constants.POST_USERPROFILE_FAILURE,
    payload: error,
});

/**
 * Sends a post request to the backend to create a new userprofile
 * @param {object} requestBody - JSON object with the request body
 *
 * @dispatches {@link postUserprofileRequest} on post request start
 * @dispatches {@link postUserprofileSuccess} on post success
 * @dispatches {@link postUserprofileFailure} on post failure with error payload
 * @dispatches {@link loginUser} on post success to login the user after registration
 *
 * @see {@link apiClient} for more information
 */
export const postUserprofile = (requestBody) => (dispatch) => {
    dispatch(postUserprofileRequest());
    dispatch({
        type: Constants.LOADING_STATE,
    });

    apiClient()
        .post('/userprofiles', requestBody)
        .then((response) => {
            console.log(
                'postUserprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(postUserprofileSuccess(response.data));
        })
        .then(() => {
            console.log('then logging in...');
            dispatch(loginUser(requestBody.email, requestBody.password));
        })
        .catch((error) => {
            console.log('error posting userprofile');
            console.warn(error);
            console.log('request body:');
            console.log(requestBody);
            dispatch(postUserprofileFailure(error));
        });
};
