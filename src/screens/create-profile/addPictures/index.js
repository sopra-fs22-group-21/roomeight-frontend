import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native-animatable';
import { colors } from 'react-native-elements';
import Loader from 'react-native-modal-loader';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { NavigationButtons } from '../../../components/navigationButtons';
import PictureInput from '../../../components/pictureInput';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
    Title,
} from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { postUserprofile } from '../../../redux/actions/postUserprofile';
import { updateUserprofile } from '../../../redux/actions/updateUserprofile';
import { uploadImages } from '../../../redux/actions/uploadImage';
import en from '../../../resources/strings/en.json';

const AddPictures = ({ navigation, route }) => {
    const { transitUserprofile } = useSelector((state) => state.transitState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { loading } = useSelector((state) => state.loadingState);

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
        <Container onPressBack={() => navigation.goBack()}>
            <Loader loading={loading} color={colors.secondary500} />
            <ScreenPadding>
                <Heading>{en.addPictures.heading}</Heading>
                <NormalText>
                    {route.params.includes('single')
                        ? en.addPictures.infoSingle
                        : en.addPictures.infoFlat}
                </NormalText>
                <Box />

                <View>
                    <FlatList
                        data={pictureSelectors}
                        keyExtractor={(item) => item.index}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-around',
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
                </View>
                <PrimaryButton
                    onPress={() => {
                        if (images) {
                            dispatch(
                                uploadImages(
                                    images,
                                    route.params.includes('single')
                                        ? 'userprofile'
                                        : 'flatprofile'
                                )
                            );
                        }
                        delete transitUserprofile.localPictureReference;
                        delete transitUserprofile.pictureReference;
                        console.log(
                            'Transituserprofile: ' +
                                JSON.stringify(transitUserprofile)
                        );
                        dispatch(updateUserprofile(transitUserprofile));
                    }}
                >
                    Done
                </PrimaryButton>
            </ScreenPadding>
        </Container>
    );
};
export default AddPictures;
