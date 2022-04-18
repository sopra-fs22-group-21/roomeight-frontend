import apiClient from '../../helper/apiClient';
import {
    POST_USERPROFILE_FAILURE,
    POST_USERPROFILE_REQUEST,
    POST_USERPROFILE_SUCCESS,
} from '../constants';
import { loginUser } from './authActions';

const postUserprofileRequest = () => ({
    type: POST_USERPROFILE_REQUEST,
});

const postUserprofileSuccess = (userprofile) => ({
    type: POST_USERPROFILE_SUCCESS,
    payload: userprofile,
});

const postUserprofileFailure = (error) => ({
    type: POST_USERPROFILE_FAILURE,
    payload: error,
});

/**
 * Sends a post request to the backend to create a new userprofile
 * @param {object} userprofile - JSON object with the request body
 *
 * @dispatches {@link postUserprofileRequest} on post request start
 * @dispatches {@link postUserprofileSuccess} on post success
 * @dispatches {@link postUserprofileFailure} on post failure with error payload
 * @dispatches {@link loginUser} on post success to login the user after registration
 *
 * @see {@link apiClient} for more information on the post request
 */
export const postUserprofile = (userprofile) => (dispatch) => {
    dispatch(postUserprofileRequest());

    apiClient()
        .post('/userprofiles', userprofile)
        .then((response) => {
            console.log(
                'postUserprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(postUserprofileSuccess(response.data));
        })
        .then(() => {
            console.log('then logging in...');
            dispatch(loginUser(userprofile.email, userprofile.password));
        })
        .catch((error) => {
            console.log('error posting userprofile');
            console.log(error.message);
            console.log(userprofile);
            dispatch(postUserprofileFailure(error));
        });
};
