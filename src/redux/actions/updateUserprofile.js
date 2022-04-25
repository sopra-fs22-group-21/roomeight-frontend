import { useSelector } from 'react-redux';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { getCurrentUserprofile } from './getUserprofiles';

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
export const updateUserprofile = (requestBody) => (dispatch) => {
    dispatch(updateUserprofileRequest());
    console.log('Requestbody: ');
    console.log(requestBody);
    apiClient()
        .patch('/userprofiles/' + auth.currentUser.uid, requestBody)
        .then((response) => {
            dispatch(updateUserprofileSuccess(response.data));
            dispatch(getCurrentUserprofile());
        })
        .catch((error) => {
            console.log('error patch userprofile');
            dispatch(updateUserprofileFailure(error));
        });
};
