import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
} from '../constants';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import store from '../configureStore';

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
 */
export const uploadImages =
    (uriList, profileType) => async (dispatch, getState) => {
        dispatch(uploadImageRequest());
        let count = 0;
        uriList.forEach(async (uri) => {
            count++;
            console.log(uriList, count);
            const uid = getState().userprofileState.userProfile.auth.uid;
            const storageRef = ref(
                storage,
                `${profileType}s/${uid}/profilePicture${count}.jpg`
            );

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
                    getDownloadURL(storageRef)
                        .then((url) => {
                            dispatch(uploadImageSuccess(url));
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(uploadImageFailure(error));
                        });
                },
                error: (error) => {
                    console.log(error);
                    dispatch(uploadImageFailure(error));
                },
            });
        });
    };
