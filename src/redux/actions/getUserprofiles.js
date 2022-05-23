import { auth } from '../../../firebase/firebase-config';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getDiscoverProfiles, updateDiscoverProfiles } from './discoverActions';
import { getFlatprofile } from './getFlatprofiles';

const getCurrentUserprofileRequest = (request) => ({
    type: Constants.GET_CURRENT_USER_REQUEST,
    payload: request,
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
export const getCurrentUserprofile = () => (dispatch) => {
    const url = `/userprofiles/${auth.currentUser.uid}`;
    dispatch(
        getCurrentUserprofileRequest({
            id: auth.currentUser.uid,
            url: url,
        })
    );
    let userprofile = {};

    apiClient()
        .get(url)
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        })
        .then((response) => {
            userprofile = response.data;
            dispatch(getCurrentUserprofileSuccess(response.data));
        })
        .then(() => {
            dispatch(getDiscoverProfiles());

            if (userprofile.isAdvertisingRoom) dispatch(getFlatprofile());
        });
};

export const reloadCurrentUserprofile = () => (dispatch) => {
    const url = `/userprofiles/${auth.currentUser.uid}`;
    dispatch(
        getCurrentUserprofileRequest({
            id: auth.currentUser.uid,
            url: url,
        })
    );
    apiClient()
        .get(url)
        .then((response) => {
            userprofile = response.data;
            dispatch(getCurrentUserprofileSuccess(response.data));
            if (userprofile.isAdvertisingRoom) dispatch(getFlatprofile());
        })
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        });
};
