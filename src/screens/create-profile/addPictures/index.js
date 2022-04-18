import React, { useEffect, useState } from 'react';
import { View, Button, Image, FlatList } from 'react-native';
import en from '../../../resources/strings/en.json';
import {
    TextBlock,
    Heading,
    Title,
    Container,
} from '../../../components/theme';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../../redux/actions/uploadImage';
import { NavigationButtons } from '../../../components/navigationButtons';
import { SecondaryButton } from '../../../components/button';
import PictureInput from '../../../components/profilePictureInput';
import { PickImage } from '../../../helper/imageHandler';

const AddPictures = ({ navigation }) => {
    const userImages = useSelector(
        (state) => state.userprofileState.userProfile.pictureReferences
    );
    const [images, setImages] = useState(
        userImages ? userImages : ['', '', '', '']
    );

    const dispatch = useDispatch();

    function deletePicture(index) {
        let updated = [...images];
        updated[index] = '';
        setImages(updated);
    }

    async function addPicture(index) {
        const uri = await PickImage();
        let updated = [...images];
        updated[index] = uri;
        setImages(updated);
    }

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        }
    }, []);

    const pictureSelectors = [
        {
            index: 0,
            image: images[0],
        },
        {
            index: 1,
            image: images[1],
        },
        {
            index: 2,
            image: images[2],
        },
        {
            index: 3,
            image: images[3],
        },
    ];

    return (
        <Container>
            <Title>{en.addPictures.heading}</Title>

            <FlatList
                data={pictureSelectors}
                keyExtractor={(item) => item.index}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly',
                    paddingBottom: 30,
                }}
                renderItem={({ item }) => (
                    <PictureInput
                        variant="additional"
                        onPressDelete={() => deletePicture(item.index)}
                        onPressSelect={() => addPicture(item.index)}
                        image={item.image}
                    />
                )}
            />

            <NavigationButtons
                onPressBack={() => navigation.goBack()}
                onPressNext={() => {
                    dispatch(uploadImages(images, 'userprofile'));
                    navigation.navigate('Discover');
                }}
            />
        </Container>
    );
};
export default AddPictures;
