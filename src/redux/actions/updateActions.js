import { useSelector } from 'react-redux';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { getCurrentUserprofile } from './getUserprofiles';
import {
    uploadImageFailure,
    uploadImageRequest,
    uploadImageSuccess,
} from './imageActions';
import { uploadAll } from '../../helper/imageHandler';
import { getFlatprofile } from './flatprofileActions';
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

        uploadImages(requestBody.pictureReferences).then((urls) => {
            if (urls) {
                requestBody.pictureReferences = urls;
            }
            console.log('requestBody:');
            console.log(requestBody);
            apiClient()
                .patch(`/${profileType}/${profileId}`, requestBody)
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
