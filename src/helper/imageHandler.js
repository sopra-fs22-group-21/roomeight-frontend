import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
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
 * gets the download url of an image link is temporarily available for everyone (even unauthenticated)
 * to use direct authentication something like this is required
 * return source = {
            method:'GET',
            uri: `https://firebasestorage.googleapis.com/v0/b/roomeight-9cd94.appspot.com/o/${type}%2F${id}%2F${picture}?alt=media`,
            headers: {
                Authorization: `Bearer ${await userToken()}`,
            },
        };
 * but i have currently not found a way to use cache and this option
 *       
 * @param {string} pictureReference logical reference to the file in the storage bucket 
 * @returns 
 */
export async function getImageSource(pictureReference) {
    if(!pictureReference) return null;
    if (!pictureReference.includes('pic-')) {
        return { uri: pictureReference };
    } else {
        const picId = pictureReference.split('/')[2];
        return {
            uri: await getDownloadURL(ref(storage, pictureReference)),
            pictureId: picId,
        };
    }
}

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
                        const picId = 'pic-' + uuidv4();
                        const refPath = `${profileType}s/${uid}/${picId}.jpg`;
                        const storageRef = ref(storage, refPath);
                        const metadata = {
                            contentType: 'image/jpeg',
                            cacheControl: 'public, max-age=259200',
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
