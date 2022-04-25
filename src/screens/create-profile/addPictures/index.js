import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationButtons } from '../../../components/navigationButtons';
import PictureInput from '../../../components/pictureInput';
import { Box, Container, Title } from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { uploadImages } from '../../../redux/actions/uploadImage';
import en from '../../../resources/strings/en.json';

const AddPictures = ({ navigation }) => {
    const { transitUserprofile } = useSelector((state) => state.transitState);
    console.log(transitUserprofile.localPictureReference);
    const [images, setImages] = useState(
        transitUserprofile.localPictureReference
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

    const pictureSelectors = [
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
    ];

    return (
        <Container>
            <Box>
                <Title>{en.addPictures.heading}</Title>
            </Box>

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
                }}
            />
        </Container>
    );
};
export default AddPictures;
