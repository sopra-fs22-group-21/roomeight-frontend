import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getDownloadUrl } from '../../helper/imageHandler';
import styles from './styles';

export const ProfilePicture = (props) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (props.image) {
            getDownloadUrl(props.image)
                .then((url) => setUrl(url))
                .catch((error) => console.warn(error));
        }
    }, []);

    if (url) {
        return (
            <Image
                style={{ ...styles.imageProfile, ...props.style }}
                source={{ uri: url }}
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
