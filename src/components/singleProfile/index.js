import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../components/button';

import PictureInput from '../../components/pictureInput';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import DateInput from '../../components/dateInput';
import { pickImage } from '../../helper/imageHandler';
import { updateProfile } from '../../redux/actions/updateActions';
import { PublicProfileCard } from '../publicProfileCard';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';
import { Box } from '../theme';

const SingleProfile = (props) => {
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
        userprofile.pictureReferences
            ? userprofile.pictureReferences
            : transitUserprofile.pictureReferences
    );

    useEffect(() => {}, []);

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
    }
    if (editMode) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
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
                    </View>
                    <View>
                        <DateInput
                            label={en.completeSingleProfile.moveInDate}
                            valid={moveInDateValid}
                            defaultDate={new Date(userprofile.moveInDate)}
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
                </KeyboardAwareScrollView>
                <Box />
                <SecondaryButton
                    onPress={() => {
                        setEditMode(false);
                        if (images) {
                            user.pictureReferences = images;
                        }
                        dispatch(
                            updateProfile(
                                user,
                                'userprofile',
                                userprofile.profileId
                            )
                        );
                    }}
                >
                    Save
                </SecondaryButton>
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
