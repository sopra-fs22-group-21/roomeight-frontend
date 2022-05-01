import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native-animatable';
import { colors } from 'react-native-elements';
import Loader from 'react-native-modal-loader';
import { useDispatch, useSelector } from 'react-redux';
import PictureInput from '../../../components/pictureInput';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { pickImage } from '../../../helper/imageHandler';
import { uploadImages } from '../../../redux/actions/imageActions';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';

const AddPictures = ({ navigation, route }) => {
    const isFlat = route.params.includes('flat');
    const profileType = isFlat ? 'flatprofile' : 'userprofile';
    const { transitUserprofile, transitFlatprofile } = useSelector(
        (state) => state.transitState
    );
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { loading } = useSelector((state) => state.loadingState);

    const [images, setImages] = useState(
        isFlat
            ? transitFlatprofile.pictureReferences
                ? transitFlatprofile.pictureReferences
                : []
            : transitUserprofile.pictureReferences
    );

    const dispatch = useDispatch();

    function deletePicture(index) {
        let updated = [...images];
        updated[index] = '';
        setImages(updated);
    }

    async function addPicture(index) {
        const uri = await pickImage();
        let updated = [...images];
        updated[index] = uri;
        setImages(updated);
        dispatch(
            setTransitAttributes(
                {
                    pictureReferences: updated,
                },
                profileType
            )
        );
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
        <ScreenContainer
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                if (userprofile.isComplete && isFlat)
                    navigation.navigate('Done', route.params);
                else if (isFlat)
                    navigation.navigate(
                        'CompletePersonalProfile',
                        route.params
                    );
                else navigation.navigate('Done', 'single');
            }}
        >
            <Loader loading={loading} color={colors.secondary500} />
            <ScreenPadding>
                <Heading>{en.addPictures.heading}</Heading>
                <NormalText>
                    {isFlat
                        ? en.addPictures.infoFlat
                        : en.addPictures.infoSingle}
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
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default AddPictures;
