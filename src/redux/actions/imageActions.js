import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import { uploadAll } from '../../helper/imageHandler';
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

//this is not dispatching because it is needed afterwards for update in profiles
//returns a simple promise
export const uploadImages = async (
    pictureReferences,
    profileType,
    profileId
) => {
    console.log('pictureReferences in uploadImages');
    console.log(pictureReferences);
    if (pictureReferences && pictureReferences.length > 0) {
        console.log('uploading All');
        //dispatch(uploadImageRequest(profileType));
        return uploadAll(pictureReferences, profileType, profileId)
            .then((urls) => {
                console.log('urls after Upload All:');
                console.log(urls);
                //dispatch(uploadImageSuccess(urls, profileType));
                console.log(urls);
                return urls;
            })
            .catch((error) => {
                console.log('error uploading image');
                console.log(error);
                //dispatch(uploadImageFailure(error, profileType));
                return [];
            });
    } else {
        return Promise.resolve(null);
    }
};
