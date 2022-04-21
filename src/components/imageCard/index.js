import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Box, NormalText, PinkBackground, TextBlock, Title } from '../theme';
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import Tags from '../tags';
import tags from '../../resources/strings/tags';
import tagIcons from '../../resources/icons/tagIcons';
import { InputBox, InputLabel } from '../input';
import Swiper from 'react-native-web-swiper';
import { SharedElement } from 'react-navigation-shared-element';

export const ImageCard = (props) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    return (
        <PinkBackground>
            <Box />

            <TouchableOpacity style={styles.name} onPress={props.onPress}>
                <SharedElement id={'firstName'}>
                    <Title>{userprofile.firstName}</Title>
                </SharedElement>
            </TouchableOpacity>
            <View style={styles.swiper}>
                <SharedElement id={'profilePicture'}>
                    <ProfilePicture
                        image={userprofile.pictureReference[0]}
                        style={styles.image}
                    />
                </SharedElement>
            </View>
        </PinkBackground>
    );
};
