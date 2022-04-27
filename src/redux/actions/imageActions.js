import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import * as Constants from '../constants';

/**
 * dispatches the correct type
 *
 * @param {'userprofile' | 'flatprofile'} profileType - either userprofile or flatprofile
 * @dispatches one of {@link Constants.UPLOAD_IMAGE_REQUEST_USERPROFILE} | {@link Constants.UPLOAD_IMAGE_REQUEST_FLATPROFILE}
 */
export const uploadImageRequest = (profileType) =>
    profileType === 'userprofile'
        ? {
              type: Constants.UPLOAD_IMAGE_REQUEST_USERPROFILE,
          }
        : { type: Constants.UPLOAD_IMAGE_REQUEST_FLATPROFILE };

/**
 * dispatches the correct type
 *
 * @param {'userprofile' | 'flatprofile'} profileType - either userprofile or flatprofile
 * @dispatches one of {@link Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE} | {@link Constants.UPLOAD_IMAGE_SUCCESS_FLATPROFILE}
 */
export const uploadImageSuccess = (url, profileType) =>
    profileType === 'userprofile'
        ? {
              type: Constants.UPLOAD_IMAGE_SUCCESS_USERPROFILE,
              payload: url,
          }
        : { type: Constants.UPLOAD_IMAGE_SUCCESS_FLATPROFILE, payload: url };

/**
 * dispatches the correct type
 *
 * @param {'userprofile' | 'flatprofile'} profileType - either userprofile or flatprofile
 * @dispatches one of {@link Constants.UPLOAD_IMAGE_FAILURE_USERPROFILE} | {@link Constants.UPLOAD_IMAGE_FAILURE_FLATPROFILE}
 */
export const uploadImageFailure = (error, profileType) =>
    profileType === 'userprofile'
        ? {
              type: Constants.UPLOAD_IMAGE_FAILURE_USERPROFILE,
              payload: error,
          }
        : { type: Constants.UPLOAD_IMAGE_FAILURE_FLATPROFILE, payload: error };
/**
 * Uploads an image to firebase and writes the download url to the redux store.
 *
 * @param {array} uriList the list of uri's of the images to upload
 * @param {string} profileType either "userprofile" or "flatprofile"
 * @todo what happens if downloadurl fails? picture should get deleted?
 * @todo better to store downloadurl or refrpath?
 */
export const uploadImages =
    (uriList, profileType) => async (dispatch, getState) => {
        dispatch(uploadImageRequest(profileType));
        let filteredList = uriList.filter((uri) => uri !== '');
        let count = 0;
        console.log(filteredList, count);
        filteredList.forEach(async (uri) => {
            count++;
            const uid = getState().authState.auth.uid;
            const refPath = `${profileType}s/${uid}/profilePicture${count}.jpg`;
            const storageRef = ref(storage, refPath);

            const response = await fetch(uri);
            const blob = await response.blob();

            const metadata = {
                contentType: 'image/jpeg',
                customMetadata: {
                    profileType: profileType,
                    uploadedBy: uid,
                    uploadedAt: Date.now().toLocaleString(),
                },
            };

            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

            uploadTask.on('state_changed', {
                complete: () => {
                    console.log('upload complete!');
                    dispatch(uploadImageSuccess(refPath, profileType));
                },
                error: (error) => {
                    console.log(error);
                    dispatch(uploadImageFailure(error, profileType));
                },
            });
        });
    };

export const setLocalPictureReferences = (references, profileType) =>
    profileType === 'userprofile'
        ? {
              type: Constants.SET_LOCAL_PICTURE_REFERENCES_USER,
              payload: references,
          }
        : {
              type: Constants.SET_LOCAL_PICTURE_REFERENCES_FLAT,
              payload: references,
          };
