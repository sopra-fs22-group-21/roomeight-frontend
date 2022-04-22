import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import {
    Box,
    NormalText,
    PinkBackground,
    Strong,
    TextBlock,
    Title,
} from '../theme';
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

const ITEM_WIDTH = Dimensions.get('window').width - 80;

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
                    height="100%"
                    itemWidth={ITEM_WIDTH}
                    sliderWidth={ITEM_WIDTH}
                    overlay
                />
                <Pressable style={styles.description} onPress={props.onPress}>
                    <InputLabel style={styles.text}>
                        {en.discover.description}
                    </InputLabel>
                    <Strong style={{ ...styles.text, ...styles.smaller }}>
                        {props.profile.description}
                    </Strong>
                </Pressable>
            </View>
        </PinkBackground>
    );
};
