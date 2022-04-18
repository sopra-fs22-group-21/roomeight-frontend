import React, { useEffect, useState } from 'react';
import { View, Button, Image } from 'react-native';
import en from '../../../resources/strings/en.json';
import { TextBlock, Heading, Title, Container } from '../../../components/theme';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import ImageInput from '../../../components/imageInput';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../../../redux/actions/uploadImage';
import { NavigationButtons } from '../../../components/navigationButtons';
import { SecondaryButton } from '../../../components/button';

const AddPictures = ({ navigation }) => {
    const [images, setImages] = useState([])

    const dispatch = useDispatch();
    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            console.log(images);
            console.log(result);
            setImages([...images, result.uri]);
        }
    };

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

    let first;
    console.log(images);
    if (images[0]) {
        first = (
            <Image
                source={{ uri: images[0] }}
                style={{ width: 80, height: 100 }}
            />
        );
    }
    let second;
    if (images[1]) {
        second = (
            <Image
                source={{ uri: images[1] }}
                style={{ width: 80, height: 100 }}
            />
        );
    }
    console.log(JSON.stringify(navigation.state))
    return (
        <Container>
            <Title>{en.addPictures.heading}</Title>
            {first || <ImageInput onPress={() => PickImage()} />}
            {second || <ImageInput onPress={() => PickImage()} />}
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
