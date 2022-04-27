import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase-config';

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
export const getDownloadUrl = async (pictureReference) => {
    const reference = ref(storage, pictureReference);
    return getDownloadURL(reference);
};
