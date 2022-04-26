import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile, getMatches } from './getFlatprofile';
import { auth, storage } from '../../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';

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
export const getCurrentUserprofile = () => (dispatch) => {
    console.log('userid: ' + auth.currentUser.uid);
    dispatch(getCurrentUserprofileRequest());

    apiClient()
        .get(`/userprofiles/${auth.currentUser.uid}`)
        .then(async (response) => {
            const userprofile = response.data;
            Promise.all(
                userprofile.pictureReference.map((reference) => {
                    return getDownloadURL(ref(storage, reference));
                })
            ).then((urls) => {
                userprofile.images = urls;
                dispatch(getCurrentUserprofileSuccess(userprofile));
            });
            //dispatch(getDiscoverProfiles(userprofile.isSearchingRoom));
            //if(userprofile.matches.length > 0) dispatch(getMatches(userprofile.matches));
        })
        .catch((error) => {
            dispatch(getCurrentUserprofileFailure(error));
        });
};
