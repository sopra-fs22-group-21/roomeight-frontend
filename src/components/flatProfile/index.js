import { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import tagIcons from '../../resources/icons/tagIcons';
import { Container, Name, Screen, Heading, Title, Box } from '../theme';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, InputLabel, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import DateInput from '../../components/dateInput';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { updateProfile } from '../../redux/actions/updateActions';
import dateFormat from 'dateformat';
import { PublicProfileCard } from '../publicProfileCard';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';
import PictureInput from '../../components/pictureInput';

const FlatProfile = (props) => {
    useEffect(() => {}, []);

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadingState);

    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [description, setDescription] = useState(null);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [flat, setFlat] = useState({});
    const [addressValid, setAddressValid] = useState(true);
    const [rentValid, setRentValid] = useState(null);
    const [roomSizeValid, setRoomSizeValid] = useState(null);
    const [nrRoommatesValid, setNrRoommatesValid] = useState(null);
    const [nrBathroomsValid, setNrBathroomsValid] = useState(null);
    let selectedTagsFlat = [];
    const [editMode, setEditMode] = useState(false);

    function changeToTemporary() {
        setFlat({
            ...flat,
            permanent: false,
        });
    }

    function changeToPermanent() {
        delete flat.moveOutDate;
        setFlat({
            ...flat,
            permanent: true,
        });
    }
    const isCarousel = useRef(null);
    const ITEM_WIDTH = 280 + 20; //item width is 280, padding 20
    const SLIDER_WIDTH = Dimensions.get('window').width - 25;

    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [pictureSelectors, setPictureSelectors] = useState([]);
    const [images, setImages] = useState(
        flat.pictureReferences ? flat.pictureReferences : null
    );

    function deletePicture(index) {
        let updated = [...images];
        updated[index] = undefined;
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
    }, [images]);

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

    if (!loading) {
        console.log('loading: ' + loading);
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
                        <Input
                            label={en.roomInfo.address}
                            error={addressValid === false}
                            defaultValue={flatprofile.address}
                            onChangeText={(text) =>
                                setFlat({
                                    ...flat,
                                    address: text,
                                })
                            }
                        />
                        <DateInput
                            label={en.roomInfo.moveInDate}
                            valid={moveInDateValid}
                            defaultDate={
                                flatprofile.moveInDate
                                    ? new Date(flatprofile.moveInDate)
                                    : null
                            }
                            onChange={(date, valid) => {
                                if (valid)
                                    setFlat({
                                        ...flat,
                                        moveInDate: date,
                                    });
                                setmoveInDateValid(valid && date > new Date());
                            }}
                        />
                        <InputLabel>{en.roomInfo.duration}</InputLabel>
                        <Box style={styles.box}>
                            <CheckBox
                                containerStyle={styles.choice}
                                wrapperStyle={styles.wrapper}
                                textStyle={styles.text}
                                title={'Temporary'}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                color="#0E7490"
                                checked={!flat.permanent}
                                onPress={() => changeToTemporary()}
                            ></CheckBox>
                            <CheckBox
                                containerStyle={styles.choice}
                                wrapperStyle={styles.wrapper}
                                textStyle={styles.text}
                                title="Permanent"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                color="#0E7490"
                                checked={flat.permanent}
                                onPress={() => changeToPermanent()}
                            ></CheckBox>
                        </Box>
                        {!flat.permanent ? (
                            <DateInput
                                label={en.roomInfo.moveOutDate}
                                error={moveOutDateValid === false}
                                defaultDate={
                                    flatprofile.moveOutDate
                                        ? new Date(flatprofile.moveOutDate)
                                        : null
                                }
                                onChange={(date, valid) => {
                                    const isValid =
                                        valid &&
                                        date > new Date(flatprofile.moveInDate);
                                    if (isValid)
                                        setFlat({
                                            ...flat,
                                            moveOutDate: date.toJSON(),
                                        });
                                    setMoveOutDateValid(isValid);
                                }}
                            />
                        ) : null}
                        <Input
                            label={en.roomInfo.rent}
                            keyboardType="number-pad"
                            error={rentValid === false}
                            placeholder="CHF"
                            defaultValue={flatprofile.rent}
                            onChangeText={(text) => {
                                setRentValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    rent: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.roomInfo.roomSize}
                            keyboardType="number-pad"
                            placeholder="m2"
                            error={roomSizeValid === false}
                            defaultValue={flatprofile.roomSize}
                            onChangeText={(text) => {
                                setRoomSizeValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    roomSize: Number(text),
                                });
                            }}
                        />
                        <InputBox label={en.flatInfo.tags}>
                            <Tags
                                selected={flatprofile.tags}
                                onChange={(tags) =>
                                    setFlat({
                                        ...flat,
                                        tags: tags,
                                    })
                                }
                            />
                        </InputBox>
                        <Input
                            label={en.flatInfo.nrRoommates}
                            keyboardType="number-pad"
                            error={nrRoommatesValid === false}
                            defaultValue={flatprofile.numberOfRoommates}
                            onChangeText={(text) => {
                                setNrRoommatesValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    numberOfRoommates: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.roomInfo.nrBathrooms}
                            keyboardType="number-pad"
                            error={nrBathroomsValid === false}
                            defaultValue={flatprofile.numberOfBaths}
                            onChangeText={(text) => {
                                setNrBathroomsValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    numberOfBaths: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.flatInfo.description}
                            multiline
                            defaultValue={flatprofile.description}
                            placeholder={en.flatInfo.descriptionPlaceholder}
                            onChangeText={(text) =>
                                setFlat({
                                    ...flat,
                                    description: text,
                                })
                            }
                        />
                        <PrimaryButton
                            onPress={() => {
                                setEditMode(false);
                                if (images) {
                                    flatprofile.pictureReferences = images;
                                }
                                console.log(flatprofile);
                                console.log(flat);
                                dispatch(
                                    updateProfile(
                                        flat,
                                        'flatprofile',
                                        flatprofile.profileId
                                    )
                                );
                            }}
                        >
                            Save
                        </PrimaryButton>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    } else {
        return (
            <PublicProfileCard
                profile={flatprofile} //true????
                onClickEdit={() => {
                    setEditMode(true);
                }}
                isFlat={true}
                showDetailsFirst={true}
            />
        );
    }
};
export default FlatProfile;
