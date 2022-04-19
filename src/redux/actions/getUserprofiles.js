import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';

const getCurrentUserprofileRequest = () => ({
    type: Constants.GET_CURRENT_USER_REQUEST,
});

const getCurrentUserprofileSuccess = (response) => ({
    type: Constants.GET_CURRENT_USER_SUCCESS,
    payload: response,
});

const getCurrentUserprofileFailure = (error) => ({
    type: Constants.GET_CURRENT_USER_FAILURE,
    payload: error,
});

/**
 * makes a request to the backend api to get the current userprofile
 * @params {string} userId the uid of a user to set as pathvariable
 * @dispatches {@link getCurrentUserprofileRequest} on request start
 * @dispatches {@link getCurrentUserprofileSuccess} on request success with userprofile payload
 * @dispatches {@link getCurrentUserprofileFailure} on request failure with error payload
 */
export const getCurrentUserprofile = (userId) => (dispatch) => {
    dispatch(getCurrentUserprofileRequest());

    apiClient()
        .get(`/userprofiles/${userId}`)
        .then((response) => {
            dispatch(getCurrentUserprofileSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        });
};
