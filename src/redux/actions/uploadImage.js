import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import {
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
} from '../constants';

const uploadImageRequest = () => ({
    type: UPLOAD_IMAGE_REQUEST,
});

const uploadImageSuccess = (url) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: url,
});

const uploadImageFailure = (error) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
});

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
        dispatch(uploadImageRequest());
        let filteredList = uriList.filter((uri) => uri !== '');
        let count = 0;
        console.log(filteredList, count);
        filteredList.forEach(async (uri) => {
            count++;
            const uid = getState().userprofileState.userProfile.auth.uid;
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
                    /* getDownloadURL(storageRef).then((url) => {
                        console.log('download url: ', url);
                        dispatch(uploadImageSuccess(url));
                    }).catch((error) => {
                        console.log('error getting download url: ', error);
                        dispatch(uploadImageFailure(error));
                    }); */
                    dispatch(uploadImageSuccess(refPath));
                },
                error: (error) => {
                    console.log(error);
                    dispatch(uploadImageFailure(error));
                },
            });
        });
    };
