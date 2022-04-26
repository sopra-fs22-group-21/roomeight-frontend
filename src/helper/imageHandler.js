import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';

export const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.3,
    });
    if (!result.cancelled) {
        return result.uri;
    }
};
/**
 * returns the current download link from firebase for the path provided
 * @param {String} pictureReference 
 */
export const getDownloadUrl = (pictureReference) => {
    const ref = ref(storage, pictureReference);
    return new Promise((resolve, reject) => {
        getDownloadURL(pictureReference)
            .then((url) => {
                resolve(url);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export const loadImagesToProfile = (profile) => {
    return Promise.all(
        [...Array(4)].map((x, i) => {
            const reference = `${
                profile.email ? 'userprofiles' : 'flatprofiles'
            }/${profile.profileId}/profilePicture${i + 1}.jpg`;
            return getDownloadURL(ref(storage, reference)).catch((error) => {});
        })
    ).then((urls) => {
        profile.images = urls.filter((url) => url != null);
        return profile;
    });
};
