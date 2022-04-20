import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

export const ProfilePicture = (props) => {
    if (props.image) {
                return (
                    <View>
                        <Image
                            style={styles.imageProfile}
                            source={{ uri: props.image }}
                        />
                    </View>
                );
            } else {
                return (
                    <View>
                        <View style={styles.backgroundProfile}>
                            <Text style={styles.placeholderProfile}>
                                {props.initials}
                            </Text>
                        </View>
                    </View>  
                );
            }
};
