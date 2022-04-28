import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { getDownloadUrl } from '../../helper/imageHandler';
import EditBadge from '../editBadge';
import styles from './styles';

/**
 * Component to select an image from the device's gallery and display it.
 * Logic must be handled with onPress function.
 *
 * @param {string} props.variant 'profile' | 'additional' | 'editprofile'
 * @param {string} props.onPress 'onPress function'
 * @param {string} props.image 'image uri'
 * @required variant!
 */

const PictureInput = (props) => {
    const [image, setImage] = useState(null);
    const getImage = () => {
        if (!image && props.image && props.image.includes('profiles')) {
            getDownloadUrl(props.image).then((url) => {
                setImage(url);
            });
        } else if (image && image != '') return image;
        else return props.image;
    };
    switch (props.variant) {
        case 'profile':
            if (getImage()) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={{ ...styles.imageProfile, ...props.style }}
                            source={{ uri: getImage() }}
                        />
                        <EditBadge variant={props.variant} set={true} />
                    </Pressable>
                );
            } else {
                return (
                    <Pressable onPress={props.onPressSelect}>
                        <View
                            style={{
                                ...styles.backgroundProfile,
                                ...props.style,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.placeholderProfile,
                                    ...props.style,
                                }}
                            >
                                {props.initials}
                            </Text>
                        </View>
                        <EditBadge variant={props.variant} set={false} />
                    </Pressable>
                );
            }
        case 'additional':
            if (getImage()) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.imageAdditional}
                            source={{ uri: getImage() }}
                        />
                        <EditBadge variant={props.variant} set={true} />
                    </Pressable>
                );
            } else {
                return (
                    <Pressable onPress={props.onPressSelect}>
                        <View style={styles.backgroundAdditional}>
                            <Text style={styles.placeholderAdditional}>
                                {props.initials}
                            </Text>
                        </View>
                        <EditBadge variant={props.variant} set={false} />
                    </Pressable>
                );
            }
        case 'editprofile':
            if (getImage()) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.editprofile}
                            source={{ uri: getImage() }}
                        />
                        <EditBadge variant={props.variant} set={true} />
                    </Pressable>
                );
            } else {
                return (
                    <Pressable onPress={props.onPressSelect}>
                        <View style={styles.backgroundEditprofile}>
                            <Text style={styles.placeholderEdit}>
                                {props.initials}
                            </Text>
                        </View>
                        <EditBadge variant={props.variant} set={false} />
                    </Pressable>
                );
            }
        default:
            return <Text> specify variant! </Text>;
    }
};

export default PictureInput;
