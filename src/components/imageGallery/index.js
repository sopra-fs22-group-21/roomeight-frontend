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
import { SharedElement } from 'react-navigation-shared-element';
import Carousel from 'react-native-snap-carousel';

export const ITEM_WIDTH = Dimensions.get('window').width - 80;

const Img = ({ item, index }) => {
    return (
        <SharedElement id={'profilePicture' + index} key={item}>
            <Image source={{ uri: item }} style={styles.image} />
        </SharedElement>
    );
};

export const ImageGallery = ({ imageRefs }) => {
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0);

    return (
        <View>
            <Carousel
                layoutCardOffset={index}
                onSnapToItem={(index) => setIndex(index)}
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
