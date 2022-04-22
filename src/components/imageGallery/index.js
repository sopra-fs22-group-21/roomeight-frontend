import { React, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';

export const ITEM_WIDTH = Dimensions.get('window').width - 80;

const Img = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image source={{ uri: item }} style={styles.image} />
            <LinearGradient
                style={styles.overlay}
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            />
        </View>
    );
};

export const ImageGallery = ({ imageRefs }) => {
    const isCarousel = useRef(null);

    return (
        <View>
            <Carousel
                ref={isCarousel}
                data={imageRefs}
                renderItem={Img}
                sliderWidth={ITEM_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};
