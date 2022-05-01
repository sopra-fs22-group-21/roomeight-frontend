import { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import tagIcons from '../../resources/icons/tagIcons';
import { Name, Screen, Heading, Title, Box } from '../theme';
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
import { PictureInputGallery } from '../pictureInputGallery';

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

    if (editMode) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.inner}
                    behavior="padding"
                >
                    <PictureInputGallery
                        profile={flatprofile}
                        onChange={(images) =>
                            setFlat({
                                ...flat,
                                pictureReferences: images,
                            })
                        }
                    />
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
                    </View>
                </KeyboardAwareScrollView>
                <Box style={styles.space}></Box>
                <PrimaryButton
                    onPress={() => {
                        console.log(flat);
                        setEditMode(false);
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
