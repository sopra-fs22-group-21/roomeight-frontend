import { useSelector } from 'react-redux';
import apiClient from '../../helper/apiClient';
import * as Constants from '../constants';
import { auth } from '../../../firebase/firebase-config';
import { getCurrentUserprofile } from './getUserprofiles';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import {
    uploadImageFailure,
    uploadImageRequest,
    uploadImageSuccess,
} from './imageActions';
import { getDownloadUrl } from '../../helper/imageHandler';

const updateUserprofileRequest = () => ({
    type: Constants.UPDATE_USERPROFILE_REQUEST,
});

const updateUserprofileSuccess = (response) => ({
    type: Constants.UPDATE_USERPROFILE_SUCCESS,
    payload: response,
});

const updateUserprofileFailure = (error) => ({
    type: Constants.UPDATE_USERPROFILE_FAILURE,
    payload: error,
});

/**
 * sends update request to backend api to update the userprofile in the DB
 * @param {object} requestBody - the body of the update request
 * @dispatches {@link updateUserprofileRequest} on update request start
 * @dispatches {@link updateUserprofileSuccess} on update success with response payload
 * @dispatches {@link updateUserprofileFailure} on update failure with error payload
 */
export const updateUserprofile = (requestBody) => async (dispatch) => {
    dispatch(updateUserprofileRequest());
    if (
        requestBody.pictureReferences &&
        requestBody.pictureReferences.length > 0
    ) {
        const profileType = 'userprofile';
        dispatch(uploadImageRequest('userprofile'));
        const uriList = requestBody.pictureReferences.filter(
            (uri) => uri !== ''
        );
        Promise.all(
            uriList.map((uri) => {
                console.log();
                if (!uri.includes('profiles')) return Promise.resolve(uri);
                else return getDownloadUrl(uri);
            })
        )
            .catch((error) => {
                dispatch(uploadImageFailure(error));
            })
            .then((filteredList) => {
                console.log('uploading images');
                console.log(filteredList);
                Promise.all(
                    filteredList.map(async (url, index) => {
                        const count = index + 1;
                        console.log('current url: ' + url);
                        return fetch(url)
                            .then((response) => {
                                console.log('fetched');
                                return response.blob();
                            })
                            .then((blob) => {
                                console.log('got blob');
                                const uid = auth.currentUser.uid;
                                const refPath = `${profileType}s/${uid}/profilePicture${count}.jpg`;
                                const storageRef = ref(storage, refPath);
                                const metadata = {
                                    contentType: 'image/jpeg',
                                    customMetadata: {
                                        profileType: profileType,
                                        uploadedBy: uid,
                                        uploadedAt: Date.now().toLocaleString(),
                                    },
                                };
                                return uploadBytes(storageRef, blob, metadata);
                            });
                    })
                )
                    .then((results) => {
                        console.log(results);
                        const uris = results.map(
                            (result) => result.metadata.fullPath
                        );
                        console.log(uris);
                        requestBody.pictureReferences = uris;
                        console.log('requestBody');
                        console.log(requestBody);
                        apiClient()
                            .patch(
                                '/userprofiles/' + auth.currentUser.uid,
                                requestBody
                            )
                            .then((response) => {
                                //dispatch(uploadImageSuccess(requestBody.pictureReferences));
                                dispatch(
                                    updateUserprofileSuccess(response.data)
                                );
                                dispatch(getCurrentUserprofile());
                            })
                            .catch((error) => {
                                console.log('error patch userprofile');
                                dispatch(updateUserprofileFailure(error));
                                dispatch(
                                    uploadImageSuccess(
                                        requestBody.pictureReferences
                                    )
                                );
                            });
                    })
                    .catch((error) => {
                        console.log('error uploading');
                        console.log(error);
                        dispatch(uploadImageFailure(error, profileType));
                        requestBody.pictureReferences = [];
                        console.log('Requestbody: ');
                        console.log(requestBody);
                        apiClient()
                            .patch(
                                '/userprofiles/' + auth.currentUser.uid,
                                requestBody
                            )
                            .then((response) => {
                                dispatch(
                                    updateUserprofileSuccess(response.data)
                                );
                                dispatch(getCurrentUserprofile());
                            })
                            .catch((error) => {
                                console.log('error patch userprofile');
                                dispatch(updateUserprofileFailure(error));
                            });
                    });
            });
    } else {
        dispatch(updateUserprofileRequest());
        console.log('Requestbody: ');
        console.log(requestBody);
        apiClient()
            .patch('/userprofiles/' + auth.currentUser.uid, requestBody)
            .then((response) => {
                dispatch(updateUserprofileSuccess(response.data));
                dispatch(getCurrentUserprofile());
            })
            .catch((error) => {
                console.log('error patch userprofile');
                dispatch(updateUserprofileFailure(error));
            });
    }
};
