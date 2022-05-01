import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';
import PictureInput from '../../components/pictureInput';
import { pickImage } from '../../helper/imageHandler';
import styles from './styles';

export const PictureInputGallery = (props) => {
    const carousel = useRef(null);
    const ITEM_WIDTH = 280 + 20; //item width is 280, padding 20
    const SLIDER_WIDTH = Dimensions.get('window').width - 25;
    const [pictureSelectors, setPictureSelectors] = useState([]);

    const [images, setImages] = useState(
        props.profile.pictureReferences ? props.profile.pictureReferences : null
    );

    function deletePicture(index) {
        let updated = [...images];
        updated[index] = undefined;
        setImages(updated);
        props.onChange(updated);
    }

    async function addPicture(index) {
        const uri = await pickImage();
        let updated = [...images];
        updated[index] = uri;
        setImages(updated);
        props.onChange(updated);
    }

    useEffect(async () => {
        if (Constants.platform.OS !== 'web') {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        }
    }, []);

    useEffect(() => {
        setPictureSelectors([
            {
                index: 0,
                image: images ? images[0] : null,
            },
            {
                index: 1,
                image: images ? images[1] : null,
            },
            {
                index: 2,
                image: images ? images[2] : null,
            },
            {
                index: 3,
                image: images ? images[3] : null,
            },
        ]);
    }, [images, props.profile]);

    const Img = ({ item, index }) => {
        return (
            <View style={styles.imageSlider} key={index}>
                <PictureInput
                    variant="editprofile"
                    onPressDelete={() => deletePicture(item.index)}
                    onPressSelect={() => addPicture(item.index)}
                    image={item.image}
                />
            </View>
        );
    };

    return (
        <View>
            <Carousel
                {...props}
                ref={carousel}
                data={pictureSelectors}
                renderItem={Img}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                activeSlideAlignment="start"
                useScrollView={true}
            />
        </View>
    );
};
