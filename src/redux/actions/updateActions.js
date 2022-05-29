import * as Notifications from 'expo-notifications';
import apiClient from '../../helper/apiClient';
import { registerForPushNotificationsAsync } from '../../helper/notificationsHelper';
import * as Constants from '../constants';
import { uploadImages } from './imageActions';
import { postRoommateToFlat } from './postFlatprofile';

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
        console.log(requestBody);
        console.log(profileId);

        let emails = requestBody.roommateEmails;
        delete requestBody.roommateEmails;

        if (profileType == 'userprofile') requestBody.isComplete = true;
        return uploadImages(
            //only uploads if picturereferencesis set and not empty
            requestBody.pictureReferences,
            profileType,
            profileId
        )
            .then((urls) => {
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
                        dispatch(
                            updateProfileSuccess(response.data, profileType)
                        );
                    })
                    .catch((error) => {
                        dispatch(updateProfileFailure(error, profileType));
                        console.log('error patch profile');
                        console.log(error);
                        console.log('request body:');
                        console.log(requestBody);
                    });
            })
            .then(async () => {
                if (emails) {
                    console.log('adding users to flat');
                    console.log(emails);
                    try {
                        return await Promise.all(
                            emails.map((email) => {
                                return dispatch(postRoommateToFlat(email));
                            })
                        );
                    } catch (error) {
                        return console.log('error posting roommates ' + error);
                    }
                }
            });
    };

/**
 * Post request to register the device for push notifications
 * @param {String} token
 * @dispatches {@link updateProfileSuccess} on update success with response payload
 * @dispatches {@link updateProfileFailure} on update failure with error payload
 */
export const postPushToken = () => async (dispatch) => {
    const token = await registerForPushNotificationsAsync();
    if (!token) return;
    dispatch({
        type: Constants.POST_PUSH_TOKEN_REQUEST,
        payload: token,
    });
    try {
        await apiClient().post(`userprofiles/devices/${token}`);
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
export const deletePushToken = () => async (dispatch) => {
    try {
        const response = await Notifications.getExpoPushTokenAsync();
        const token = response.data;
        if (!token) return;
        dispatch({
            type: Constants.DELETE_PUSH_TOKEN_REQUEST,
            payload: token,
        });
        await apiClient().delete(`userprofiles/devices/${token}`);
        dispatch({
            type: Constants.DELETE_PUSH_TOKEN_SUCCESS,
            payload: token,
        });
    } catch (error) {
        dispatch(deletePushTokenFailure(error));
    }
};
