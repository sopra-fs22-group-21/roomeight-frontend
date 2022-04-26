import { auth } from '../../../firebase/firebase-config';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getAllFlatProfiles, getFlatprofile } from './getFlatprofile';

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

const getAllUserprofilesRequest = (request) => ({
    type: Constants.GET_ALL_USERPROFILES_REQUEST,
    payload: request,
});
const getAllUserprofilesSuccess = (response) => ({
    type: Constants.GET_ALL_USERPROFILES_SUCCESS,
    payload: response,
});
const getAllUserprofilesFailure = (error) => ({
    type: Constants.GET_ALL_USERPROFILES_FAILURE,
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
        .then(async (response) => {
            userprofile = response.data;
            userprofile.images = [];
            dispatch(getCurrentUserprofileSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        })
        .then(() => {
            if (userprofile.isSearchingRoom) dispatch(getAllFlatProfiles());
            else dispatch(getAllUserprofiles());
        })
        .then(() => {
            if (userprofile.flatId && userprofile.flatId != '')
                dispatch(getFlatprofile(userprofile.flatId));
        });
};

/**
 * makes a request to the backend api to get all userprofiles
 * @dispatches {@link getAllUserprofilesRequest} on request start
 * @dispatches {@link getAllUserprofilesSuccess} on request success with userprofile payload
 * @dispatches {@link getAllUserprofilesFailure} on request failure with error payload
 */
export const getAllUserprofiles = () => (dispatch) => {
    const url = '/userprofiles/';
    dispatch(
        getAllUserprofilesRequest({
            id: auth.currentUser.uid,
            url: url,
        })
    );
    let userprofiles = [];

    apiClient()
        .get(url)
        .then((response) => {
            userprofiles = response.data;
            dispatch(getAllUserprofilesSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getAllUserprofilesFailure(error));
        });
};
