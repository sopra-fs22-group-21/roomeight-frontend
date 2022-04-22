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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageGallery } from '../imageGallery';
import { LinearGradient } from 'expo-linear-gradient';

export const ImageCard = (props) => {
    return (
        <PinkBackground style={styles.pink}>
            <TouchableWithoutFeedback
                style={styles.name}
                onPress={props.onPress}
            >
                <Title>
                    {props.profile.firstName
                        ? props.profile.firstName
                        : props.profile.name}
                </Title>
            </TouchableWithoutFeedback>
            <View style={styles.swiper}>
                <ImageGallery
                    imageRefs={props.profile.pictureReference}
                    onDoubleTap={props.onDoubleTap}
                />
                <Pressable style={styles.description} onPress={props.onPress}>
                    <InputLabel style={styles.text}>
                        {en.discover.description}
                    </InputLabel>
                    <NormalText style={{ ...styles.text, ...styles.smaller }}>
                        {props.profile.description}
                    </NormalText>
                </Pressable>
            </View>
        </PinkBackground>
    );
};
