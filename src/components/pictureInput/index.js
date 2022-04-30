import { useEffect, useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { getImageSource } from '../../helper/imageHandler';
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
    const [imageSource, setImageSource] = useState(null);

    async function loadSource() {
        const source = await getImageSource(props.image);
        setImageSource(source);
    }

    useEffect(() => {
        loadSource();
    }, [props.image]);

    switch (props.variant) {
        case 'profile':
            if (imageSource) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={{ ...styles.imageProfile, ...props.style }}
                            source={{ uri: imageSource.uri }}
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
            if (imageSource) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.imageAdditional}
                            source={{ uri: imageSource.uri }}
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
            if (imageSource) {
                return (
                    <Pressable onPress={props.onPressDelete}>
                        <Image
                            style={styles.editprofile}
                            source={{ uri: imageSource.uri }}
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
