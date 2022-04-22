import { React, useRef, useState } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { DoubleTap } from '../doubleTap';

export const ImageGallery = (props) => {
    const isCarousel = useRef(null);

    const Img = ({ item, index }) => {
        return (
            <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                <View
                    style={{ ...styles.container, height: props.height }}
                    key={index}
                >
                    <Image source={{ uri: item }} style={styles.image} />
                    {props.overlay ? (
                        <LinearGradient
                            style={styles.overlay}
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                        />
                    ) : null}
                </View>
            </DoubleTap>
        );
    };
    return (
        <View>
            <Carousel
                {...props}
                ref={isCarousel}
                data={props.imageRefs}
                renderItem={Img}
                sliderWidth={props.sliderWidth}
                itemWidth={props.itemWidth}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};
