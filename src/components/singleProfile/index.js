import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';

import PictureInput from '../../components/pictureInput';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import DateInput from '../../components/dateInput';
import { PickImage } from '../../helper/imageHandler';
import { updateUserprofile } from '../../redux/actions/updateUserprofile';
import { PublicProfileCard } from '../publicProfileCard';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { uploadImages } from '../../redux/actions/uploadImage';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';

const SingleProfile = (props) => {
    useEffect(() => {
        console.log('render');
    }, []);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadingState);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [moveInDateValid, setmoveInDateValid] = useState(
        userprofile.moveInDate
    );
    const [user, setUser] = useState({});

    const [editMode, setEditMode] = useState(false);

    const isCarousel = useRef(null);
    const ITEM_WIDTH = 280 + 20; //item width is 280, padding 20
    const SLIDER_WIDTH = Dimensions.get('window').width - 25;

    const { transitUserprofile } = useSelector((state) => state.transitState);
    const [images, setImages] = useState(
        userprofile.pictureReference
            ? userprofile.pictureReference
            : transitUserprofile.localPictureReference
    );

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

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    if (editMode) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={styles.inner}
                    behavior="padding"
                >
                    <View>
                        <Carousel
                            {...props}
                            ref={isCarousel}
                            data={pictureSelectors}
                            renderItem={Img}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            activeSlideAlignment="start"
                            useScrollView={true}
                        />
                        {/* <FlatList
                            data={pictureSelectors}
                            keyExtractor={(item) => item.index}
                            numColumns={4}
                            columnWrapperStyle={{
                                justifyContent: 'space-around',
                                paddingBottom: 30,
                            }}
                            renderItem={({ item }) => (
                                <PictureInput
                                    variant="editprofile"
                                    onPressDelete={() =>
                                        deletePicture(item.index)
                                    }
                                    onPressSelect={() => addPicture(item.index)}
                                    image={item.image}
                                />
                            )}
                        /> */}
                    </View>
                    <View>
                        <DateInput
                            label={en.completeSingleProfile.moveInDate}
                            valid={moveInDateValid}
                            defaultValue={userprofile.moveInDate}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: date,
                                    });
                                setmoveInDateValid(valid && date > new Date());
                            }}
                        />

                        <InputBox label={'Tags'}>
                            <Tags
                                selected={userprofile.tags}
                                onChange={(tags) =>
                                    setUser({
                                        ...user,
                                        tags: tags,
                                    })
                                }
                            />
                        </InputBox>
                        <Input
                            label={en.completePersonalProfile.biography}
                            defaultValue={userprofile.biography}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    biography: text,
                                })
                            }
                        />
                        <Input
                            label={en.completePersonalProfile.description}
                            defaultValue={userprofile.description}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    description: text,
                                })
                            }
                        />
                    </View>
                    <PrimaryButton
                        onPress={() => {
                            setEditMode(false);
                            dispatch(updateUserprofile(user));
                            if (images) {
                                dispatch(uploadImages(images, 'single'));
                            }
                            /* console.log('putting');
                            console.log(userprofile); */
                            console.log(user);
                        }}
                    >
                        Save
                    </PrimaryButton>
                </KeyboardAwareScrollView>
            </View>
        );
    } else {
        return (
            <PublicProfileCard
                profile={userprofile}
                onClickEdit={() => setEditMode(true)}
                isFlat={false}
            />
        );
    }
};
export default SingleProfile;
