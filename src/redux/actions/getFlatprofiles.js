import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';

const getFlatprofileRequest = () => ({
    type: Constants.GET_FLATPROFILE_REQUEST,
});

export const getFlatprofileSuccess = (response) => ({
    type: Constants.GET_FLATPROFILE_SUCCESS,
    payload: response,
});

const getFlatprofileFailure = (error) => ({
    type: Constants.GET_FLATPROFILE_FAILURE,
    payload: error,
});
/**
 * makes a request to the backend api to get the current userprofile
 * @params {string} userId the uid of a user to set as pathvariable
 * @dispatches {@link getMatchesRequest} on request start
 * @dispatches {@link getCurrentUserprofileSuccess} on request success with userprofile payload
 * @dispatches {@link getMatchesFailure} on request failure with error payload
 */
export const getFlatprofile = () => (dispatch, getState) => {
    const { flatId } = getState().userprofileState.userprofile;
    dispatch(getFlatprofileRequest());
    let flatprofile = {};
    apiClient()
        .get(`/flatprofiles/${flatId}`)
        .catch((error) => {
            dispatch(getFlatprofileFailure(error));
        })
        .then((response) => {
            dispatch(getFlatprofileSuccess(response.data));
        });
};
