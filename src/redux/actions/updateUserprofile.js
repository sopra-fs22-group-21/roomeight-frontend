import { useSelector } from 'react-redux';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';

const updateUserprofileRequest = () => ({
    type: Constants.UPDATE_USERPROFILE_REQUEST,
});

const updateUserprofileSuccess = (response) => ({
    type: Constants.UPDATE_USERPROFILE_SUCCESS,
    payload: response,
});

const updateUserprofileFailure = (error) => ({
    type: Constants.UPDATE_USERPROFILE_FAILURE,
    payload: error,
});

/**
 * sends update request to backend api to update the userprofile in the DB
 * @param {object} requestBody - the body of the update request
 * @dispatches {@link updateUserprofileRequest} on update request start
 * @dispatches {@link updateUserprofileSuccess} on update success with response payload
 * @dispatches {@link updateUserprofileFailure} on update failure with error payload
 */
export const updateUserprofile = (id, requestBody) => (dispatch) => {
    dispatch(updateUserprofileRequest());
    console.log(requestBody);
    apiClient()
        .patch('/userprofiles/' + id, JSON.stringify(requestBody))
        .then((response) => {
            console.log(
                'completeUserprofileSuccess: ' + JSON.stringify(response.data)
            );
            dispatch(updateUserprofileSuccess(response.data));
        })
        .catch((error) => {
            console.log('error put userprofile');
            dispatch(updateUserprofileFailure(error));
        });
};
