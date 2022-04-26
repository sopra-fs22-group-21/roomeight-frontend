import * as ImagePicker from 'expo-image-picker';

export const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        maxWidth: 500,
        maxHeight: 500,
        quality: 1,
    });
    if (!result.cancelled) {
        return result.uri;
    }
};
