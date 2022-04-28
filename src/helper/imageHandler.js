import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebase-config';

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.05,
    });
    if (!result.cancelled) {
        return result.uri;
    }
};
/**
 * returns the current download link from firebase for the path provided
 * @param {String} pictureReferences
 */
export const getDownloadUrl = async (pictureReferences) => {
    const reference = ref(storage, pictureReferences);
    return getDownloadURL(reference);
};

export const uploadAll = async (uris, profileType, uid) => {
    console.log('uploading images');
    return Promise.all(
        uris.map(async (url, index) => {
            const count = index + 1;
            if (url.startsWith('flat') || url.startsWith('user')) {
                return Promise.resolve(url);
            } else {
                return fetch(url)
                    .then((response) => {
                        console.log('fetched');
                        return response.blob();
                    })
                    .then((blob) => {
                        console.log('got blob');
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
                    })
                    .then((result) => {
                        console.log('got result');
                        return result.metadata.fullPath;
                    })
                    .catch((error) => {
                        console.log('could not get result');
                        console.log(error);
                        return error;
                    });
            }
        })
    );
};
