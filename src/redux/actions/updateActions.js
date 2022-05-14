import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { getFlatprofile } from './getFlatprofiles';
import { getCurrentUserprofile } from './getUserprofiles';
import { uploadImages } from './imageActions';

const updateProfileRequest = (profileType) => ({
    type:
        profileType == 'userprofile'
            ? Constants.UPDATE_USERPROFILE_REQUEST
            : Constants.UPDATE_FLATPROFILE_REQUEST,
});

const updateProfileSuccess = (response, profileType) => ({
    type:
        profileType == 'userprofile'
            ? Constants.UPDATE_USERPROFILE_SUCCESS
            : Constants.UPDATE_FLATPROFILE_SUCCESS,
    payload: response,
});

const updateProfileFailure = (error, profileType) => ({
    type:
        profileType == 'userprofile'
            ? Constants.UPDATE_USERPROFILE_FAILURE
            : Constants.UDPATE_FLATPROFILE_FAILURE,
    payload: error,
});

const postPushTokenFailure = (error) => ({
    type: Constants.POST_PUSH_TOKEN_FAILURE,
    payload: error,
});

const deletePushTokenFailure = (error) => ({
    type: Constants.DELETE_PUSH_TOKEN_FAILURE,
    payload: error,
});

/**
 * sends update request to backend api to update the userprofile in the DB
 * @param {object} requestBody - the body of the update request
 * @dispatches {@link updateProfileRequest} on update request start
 * @dispatches {@link updateProfileSuccess} on update success with response payload
 * @dispatches {@link updateProfileFailure} on update failure with error payload
 */
export const updateProfile =
    (requestBody, profileType, profileId) => async (dispatch) => {
        dispatch(updateProfileRequest(profileType));
        dispatch({
            type: Constants.LOADING_STATE,
        });
        console.log(requestBody);
        if (profileType == 'userprofile') requestBody.isComplete = true;
        return uploadImages(
            //only uploads if picturereferencesis set and not empty
            requestBody.pictureReferences,
            profileType,
            profileId
        ).then((urls) => {
            console.log('urls:');
            console.log(urls);
            if (urls) {
                requestBody.pictureReferences = urls;
            }
            console.log('requestBody:');
            console.log(requestBody);
            return apiClient()
                .patch(`/${profileType}s/${profileId}`, requestBody)
                .then((response) => {
                    dispatch(updateProfileSuccess(response.data, profileType));
                    dispatch(
                        profileType == 'userprofile'
                            ? getCurrentUserprofile()
                            : getFlatprofile(profileId)
                    );
                })
                .catch((error) => {
                    dispatch(updateProfileFailure(error, profileType));
                    console.log('error patch profile');
                    console.log(error);
                    console.log('request body:');
                    console.log(requestBody);
                });
        });
    };

/**
 * Post request to register the device for push notifications
 * @param {String} token
 * @dispatches {@link updateProfileSuccess} on update success with response payload
 * @dispatches {@link updateProfileFailure} on update failure with error payload
 */
export const postPushToken = (token) => async (dispatch) => {
    dispatch({
        type: Constants.POST_PUSH_TOKEN_REQUEST,
    });
    try {
        await apiClient().post(`userprofiles/devices${token}`);
        dispatch({
            type: Constants.POST_PUSH_TOKEN_SUCCESS,
            payload: token,
        });
    } catch (error) {
        dispatch(postPushTokenFailure(error));
    }
};
/**
 * Delete request to unregister the device from push notifications
 * @param {*} token
 * @dispatches {@link updateProfileSuccess} on update success with response payload
 * @dispatches {@link updateProfileFailure} on update failure with error payload
 */
export const deletePushToken = (token) => async (dispatch) => {
    try {
        await apiClient().delete(`userprofiles/devices/${token}`);
        dispatch({
            type: Constants.DELETE_PUSH_TOKEN_SUCCESS,
            payload: token,
        });
    } catch (error) {
        dispatch(deletePushTokenFailure(error));
    }
};
