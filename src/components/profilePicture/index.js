import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getImageSource } from '../../helper/imageHandler';
import styles from './styles';
import CachedImage from 'expo-cached-image';
import { v4 as uuidv4 } from 'uuid';

export const ProfilePicture = (props) => {
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        if (props.image) {
            async function loadSource() {
                const source = await getImageSource(props.image);
                setImageSource(source);
            }
            loadSource();
        }
    }, [props.image]);

    if (imageSource) {
        return (
            <CachedImage
                style={{ ...styles.imageProfile, ...props.style }}
                cacheKey={imageSource.pictureId}
                source={{ uri: imageSource.uri }}
            />
        );
    } else {
        return (
            <View style={{ ...styles.backgroundProfile, ...props.style }}>
                <Text
                    style={{ ...styles.placeholderProfile, ...props.textStyle }}
                >
                    {props.initials}
                </Text>
            </View>
        );
    }
};
