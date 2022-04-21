import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native';
import { Box, NormalText, PinkBackground, TextBlock, Title } from '../theme';
import { ProfilePicture } from '../profilePicture';
import en from '../../resources/strings/en.json';
import styles from './styles';
import Tags from '../tags';
import tags from '../../resources/strings/tags';
import tagIcons from '../../resources/icons/tagIcons';
import { InputBox, InputLabel } from '../input';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageGallery } from '../imageGallery';
import { LinearGradient } from 'expo-linear-gradient';

export const ImageCard = (props) => {
    const userprofile = props.userprofile;
    return (
        <PinkBackground style={styles.pink}>
            <TouchableWithoutFeedback
                style={styles.name}
                onPress={props.onPress}
            >
                <SharedElement id={userprofile.email + 'firstName'}>
                    <Title>{userprofile.firstName}</Title>
                </SharedElement>
            </TouchableWithoutFeedback>
            <View style={styles.swiper}>
                <ImageGallery imageRefs={userprofile.pictureReference} />
                <Pressable style={styles.description} onPress={props.onPress}>
                    <SharedElement id={userprofile.email + 'descriptionLabel'}>
                        <InputLabel style={styles.text}>
                            {en.discover.description}
                        </InputLabel>
                    </SharedElement>
                    <SharedElement id={userprofile.email + 'description'}>
                        <NormalText
                            style={{ ...styles.text, ...styles.smaller }}
                        >
                            {userprofile.description}
                        </NormalText>
                    </SharedElement>
                </Pressable>
            </View>
        </PinkBackground>
    );
};
