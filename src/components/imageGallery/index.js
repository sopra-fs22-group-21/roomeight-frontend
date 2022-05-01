import { LinearGradient } from 'expo-linear-gradient';
import { React, useRef } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DoubleTap } from '../doubleTap';
import { ProfilePicture } from '../profilePicture';
import styles from './styles';

export const ImageGallery = (props) => {
    const isCarousel = useRef(null);
    const images =
        props.imageRefs && props.imageRefs.length > 0
            ? props.imageRefs
            : [null];
    const Img = ({ item, index }) => {
        return (
            <DoubleTap doubleTap={props.onDoubleTap} delay={200}>
                <View
                    style={{ ...styles.container, height: props.height }}
                    key={index}
                >
                    <ProfilePicture
                        image={item}
                        style={styles.image}
                        initials={props.initials}
                    />
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
                data={images}
                renderItem={Img}
                sliderWidth={props.sliderWidth}
                itemWidth={props.itemWidth}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};
