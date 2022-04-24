import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';

const getMatchesRequest = () => ({
    type: Constants.GET_MATCHES_REQUEST,
});

const getMatchesSuccess = (response) => ({
    type: Constants.GET_MATCHES_SUCCESS,
    payload: response,
});

const getMatchesFailure = (error) => ({
    type: Constants.GET_MATCHES_FAILURE,
    payload: error,
});

/**
 * makes a request to the backend api to get the current userprofile
 * @params {string} userId the uid of a user to set as pathvariable
 * @dispatches {@link getMatchesRequest} on request start
 * @dispatches {@link getCurrentUserprofileSuccess} on request success with userprofile payload
 * @dispatches {@link getMatchesFailure} on request failure with error payload
 */
export const getMatches = (ids) => (dispatch) => {
    dispatch(getMatchesRequest());

    Promise.all(
        ids.map((id) => {
            apiClient()
                .get(`/flatprofiles/${id}`)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    dispatch(getMatchesFailure(error));
                });
        })
    ).then((values) => {
        dispatch(getMatchesSuccess(values));
    });
};
