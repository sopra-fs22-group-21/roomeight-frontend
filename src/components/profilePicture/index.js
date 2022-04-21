import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

export const ProfilePicture = (props) => {
    if (props.image) {
        return (
                <Image
                    style={[styles.imageProfile, props.style]}
                    source={{ uri: props.image }}
                />
        );
    } else {
        return (
                <View style={[styles.backgroundProfile, props.style]}>
                    <Text style={styles.placeholderProfile}>
                        {props.initials}
                    </Text>
                </View>
        );
    }
};
