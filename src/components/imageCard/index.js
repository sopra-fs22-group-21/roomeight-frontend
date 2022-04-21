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
    const { userprofile } = useSelector((state) => state.userprofileState);
    userprofile.pictureReference = [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFuJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://vc-smash.ch/img/asset/YXNzZXRzL3RlYW1mb3Rvcy9ENC0yMDIxLTIyLmpwZWc=?fit=crop-51-34-1&w=1800&h=600&dpr=2&fm=webp&s=58a5b80a46d99ae2bc0cf8dba5ae34c4',
    ];
    return (
        <PinkBackground style={styles.pink}>
            <TouchableWithoutFeedback
                style={styles.name}
                onPress={props.onPress}
            >
                <SharedElement id={'firstName'}>
                    <Title>{userprofile.firstName}</Title>
                </SharedElement>
            </TouchableWithoutFeedback>
            <View style={styles.swiper}>
                <ImageGallery imageRefs={userprofile.pictureReference} />
                <Pressable style={styles.description} onPress={props.onPress}>
                    <SharedElement id="descriptionLabel">
                        <InputLabel style={styles.text}>
                            {en.discover.description}
                        </InputLabel>
                    </SharedElement>
                    <SharedElement id={'description'}>
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
