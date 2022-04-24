import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile, getMatches } from './getFlatprofile';

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
    console.log('userid: ' + userId);
    dispatch(getCurrentUserprofileRequest());

    apiClient()
        .get(`/profiles/${userId}`)
        .then((response) => {
            dispatch(getCurrentUserprofileSuccess(response.data));
            if (response.data.flatId.length > 0)
                dispatch(getFlatprofile(response.data.flatId));
        })
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        });
};
