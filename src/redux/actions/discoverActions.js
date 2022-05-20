import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile } from './getFlatprofiles';
import { reloadCurrentUserprofile } from './getUserprofiles';

const DISCOVER_QUANTITY = 5;

const postLikeRequest = (profileId) => ({
    type: Constants.POST_LIKE_REQUEST,
    payload: profileId
});

const postLikeSuccess = (response) => ({
    type: Constants.POST_LIKE_SUCCESS,
    payload: response,
});

const postLikeFailure = (error) => ({
    type: Constants.POST_LIKE_FAILURE,
    payload: error,
});

const postDislikeRequest = (profileId) => ({
    type: Constants.POST_DISLIKE_REQUEST,
    payload: profileId
});

const postDislikeSuccess = (response) => ({
    type: Constants.POST_DISLIKE_SUCCESS,
    payload: response,
});

const postDislikeFailure = (error) => ({
    type: Constants.POST_DISLIKE_FAILURE,
    payload: error,
});

const getDiscoverProfilesRequest = (request) => ({
    type: Constants.GET_DISCOVER_PROFILES_REQUEST,
    payload: request,
});

const getDiscoverProfilesSuccess = (response) => ({
    type: Constants.GET_DISCOVER_PROFILES_SUCCESS,
    payload: response,
});

const getDiscoverProfilesFailure = (error) => ({
    type: Constants.GET_DISCOVER_PROFILES_FAILURE,
    payload: error,
});

/**
 * sends a get Request to backend api to get all discover profiles that match the authenticated user
 * @dispatches {@link getDiscoverProfilesRequest} on get request start with
 * @dispatches {@link getDiscoverProfilesSuccess} on get success with response payload
 * @dispatches {@link getDiscoverProfilesFailure} on get failure with error payload
 */
export const getDiscoverProfiles = () => (dispatch, getState) => {
    const url = '/discover/5/';
    dispatch(getDiscoverProfilesRequest(url));

    apiClient()
        .get(url)
        .catch((error) => {
            console.warn('error getting discover profiles');
            dispatch(getDiscoverProfilesFailure(error));
        })
        .then((response) => {
            dispatch(getDiscoverProfilesSuccess(response.data));
        });
};

/**
 * sends a postRequest to backend api to like other profiles
 * @param string otherProfileId - the profile you want to like
 * @dispatches {@link postLikeRequest} on post request start
 * @dispatches {@link postLikeSuccess} on post success with response payload
 * @dispatches {@link postLikeFailure} on post failure with error payload
 */
export const postLikeFlat = (otherProfileId) => (dispatch, getState) => {
    dispatch(postLikeRequest(otherProfileId));

    apiClient()
        .post('/userprofiles/likeFlat/' + otherProfileId)
        .then((response) => {
            dispatch(
                postLikeSuccess({
                    ...response.data,
                    profileId: otherProfileId,
                })
            );
            if (response.data.isMatch) {
                dispatch(reloadCurrentUserprofile());
                dispatch({
                    type: Constants.NEW_MATCH,
                    payload: otherProfileId,
                });
            }
        })
        .catch((error) => {
            console.warn('error liking flat');
            dispatch(postLikeFailure(error));
        });
};

/**
 * sends a postRequest to backend api to like other profiles
 * @param string otherProfileId - the profile you want to like
 * @dispatches {@link postDislikeRequest} on post request start
 * @dispatches {@link postDislikeSuccess} on post success with response payload
 * @dispatches {@link postDislikeFailure} on post failure with error payload
 */
export const postDislike = (otherProfileId) => (dispatch, getState) => {
    dispatch(postDislikeRequest(otherProfileId));

    apiClient()
        .post('/userprofiles/dislike/' + otherProfileId)
        .then((response) => {
            dispatch(
                postDislikeSuccess({
                    ...response.data,
                    profileId: otherProfileId,
                })
            );
        })
        .catch((error) => {
            console.warn('error liking flat');
            dispatch(postDislikeFailure(error));
        });
};

/**
 * sends a postRequest to backend api to like other profiles
 * @param string otherProfileId - the profile you want to like
 * @dispatches {@link postLikeRequest} on post request start
 * @dispatches {@link postLikeSuccess} on post success with response payload
 * @dispatches {@link postLikeFailure} on post failure with error payload
 */
export const postLikeUser = (otherProfileId) => (dispatch) => {
    dispatch(postLikeRequest(otherProfileId));

    apiClient()
        .post('/userprofiles/likeUser/' + otherProfileId)
        .then((response) => {
            dispatch(
                postLikeSuccess({
                    ...response.data,
                    profileId: otherProfileId,
                })
            );
            if (response.data.isMatch) {
                dispatch({
                    type: Constants.NEW_MATCH,
                    payload: otherProfileId,
                });
            }
            dispatch(getFlatprofile());
        })
        .catch((error) => {
            console.warn('error liking user');
            dispatch(postLikeFailure(error));
        });
};

export const updateDiscoverProfiles = (discoverProfiles) => (dispatch) => {
    if (discoverProfiles.length < 3) dispatch(getDiscoverProfiles());
    dispatch({
        type: Constants.UPDATE_DISCOVER_PROFILES,
        payload: discoverProfiles,
    });
};

export const reloadDiscoverProfiles = () => (dispatch) => {
    dispatch(getDiscoverProfiles());
    dispatch({
        type: Constants.RELOAD_DISCOVER_PROFILES,
    });
};
