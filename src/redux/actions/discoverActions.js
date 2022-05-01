import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile } from './getFlatprofiles';
import { getCurrentUserprofile } from './getUserprofiles';

const postLikeFlatRequest = () => ({
    type: Constants.POST_LIKE_FLAT_REQUEST,
});

const postLikeFlatSuccess = (response) => ({
    type: Constants.POST_LIKE_FLAT_SUCCESS,
    payload: response,
});

const postLikeFlatFailure = (error) => ({
    type: Constants.POST_LIKE_FLAT_FAILURE,
    payload: error,
});

const postLikeUserRequest = () => ({
    type: Constants.POST_LIKE_USER_REQUEST,
});

const postLikeUserSuccess = (response) => ({
    type: Constants.POST_LIKE_USER_SUCCESS,
    payload: response,
});

const postLikeUserFailure = (error) => ({
    type: Constants.POST_LIKE_USER_FAILURE,
    payload: error,
});

/**
 * sends a postRequest to backend api to like other profiles
 * @param string otherProfileId - the profile you want to like
 * @dispatches {@link postLikeFlatRequest} on post request start
 * @dispatches {@link postLikeFlatSuccess} on post success with response payload
 * @dispatches {@link postLikeFlatFailure} on post failure with error payload
 */
export const postLikeFlat = (otherProfileId) => (dispatch, getState) => {
    dispatch(postLikeFlatRequest());

    apiClient()
        .post('/userprofiles/likeFlat/' + otherProfileId)
        .then((response) => {
            dispatch(postLikeFlatSuccess(response.data));
            if (
                response.data.matches.length >
                Object.keys(getState().userprofileState.userprofile.matches)
                    .length
            ) {
                //todo: response.data.isMatch
                dispatch(getCurrentUserprofile());
            }
        })
        .catch((error) => {
            console.warn('error liking flat');
            dispatch(postLikeFlatFailure(error));
        });
};

/**
 * sends a postRequest to backend api to like other profiles
 * @param string otherProfileId - the profile you want to like
 * @dispatches {@link postLikeUserRequest} on post request start
 * @dispatches {@link postLikeUserSuccess} on post success with response payload
 * @dispatches {@link postLikeUserFailure} on post failure with error payload
 */
export const postLikeUser = (otherProfileId) => (dispatch) => {
    dispatch(postLikeUserRequest());

    apiClient()
        .post('/userprofiles/likeUser/' + otherProfileId)
        .then((response) => {
            dispatch(postLikeUserSuccess(response.data));
            if (response.data.isMatch) {
                dispatch(getFlatprofile());
            }
        })
        .catch((error) => {
            console.warn('error liking user');
            dispatch(postLikeUserFailure(error));
        });
};

export const updateDiscoverProfiles = (discoverProfiles) => (dispatch) => {
    dispatch({
        type: Constants.UPDATE_DISCOVER_PROFILES,
        payload: discoverProfiles,
    });
};
