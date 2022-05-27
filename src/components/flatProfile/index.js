import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import M8Loader from '../../../assets/logo/M8Loader';
import { PrimaryButton } from '../../components/button';
import { Input, InputBox, InputLabel } from '../../components/input';
import Tags from '../../components/tags';
import {
    postLeaveFlat,
    postRoommateToFlat,
} from '../../redux/actions/postFlatprofile';
import { updateProfile } from '../../redux/actions/updateActions';
import en from '../../resources/strings/en.json';
import { AddRoomieInput } from '../addRoomieInput';
import { MoveInMoveOutInput } from '../moveInMoveOutInput';
import { PictureInputGallery } from '../pictureInputGallery';
import { PublicProfileCard } from '../publicProfileCard';
import { Box } from '../theme';
import styles from './styles';

const FlatProfile = ({ navigation }, props) => {
    useEffect(() => {}, []);

    const dispatch = useDispatch();
    const { flatprofile, loading } = useSelector(
        (state) => state.flatprofileState
    );
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [flat, setFlat] = useState({});
    const [addressValid, setAddressValid] = useState(true);
    const [rentValid, setRentValid] = useState(null);
    const [roomSizeValid, setRoomSizeValid] = useState(null);
    const [nrRoommatesValid, setNrRoommatesValid] = useState(null);
    const [nrBathroomsValid, setNrBathroomsValid] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const createTwoButtonAlert = () =>
        Alert.alert(en.leaveFlat.button, en.leaveFlat.sure, [
            {
                text: en.leaveFlat.cancel,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: en.leaveFlat.ok,
                onPress: () => {
                    console.log('OK Pressed');
                    dispatch(postLeaveFlat());
                },
            },
        ]);

    if (loading) return <M8Loader />;
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
                        <MoveInMoveOutInput
                            allowPermanentNull={false}
                            moveInDate={
                                flatprofile.moveInDate
                                    ? new Date(flatprofile.moveInDate)
                                    : undefined
                            }
                            moveOutDate={
                                flatprofile.moveOutDate
                                    ? new Date(flatprofile.moveOutDate)
                                    : undefined
                            }
                            permanent={flatprofile.permanent}
                            onSetMoveInDate={(date) => {
                                setFlat({
                                    ...flat,
                                    moveInDate: date.toJSON(),
                                });
                            }}
                            onChangePermanent={(permanent) => {
                                setFlat({
                                    ...flat,
                                    permanent: permanent,
                                });
                            }}
                            onSetMoveOutDate={(date) => {
                                if (date != '')
                                    setFlat({
                                        ...flat,
                                        moveOutDate: date.toJSON(),
                                    });
                            }}
                        />
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
                        <InputLabel>{en.addRoomie.heading}</InputLabel>
                        <Box />
                        <AddRoomieInput />
                        <Box />
                        {
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
                        }
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
                            style={styles.leaveButton}
                            onPress={() => {
                                createTwoButtonAlert();
                            }}
                        >
                            {en.leaveFlat.button}
                        </PrimaryButton>
                    </View>
                </KeyboardAwareScrollView>
                <Box style={styles.space}></Box>
                <PrimaryButton
                    onPress={() => {
                        setEditMode(false);
                        dispatch(
                            updateProfile(
                                flat,
                                'flatprofile',
                                flatprofile.profileId
                            )
                        );
                        if (transitFlatprofile.roommateEmails)
                            transitFlatprofile.roommateEmails.forEach((email) =>
                                dispatch(postRoommateToFlat(email))
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
                profile={flatprofile}
                onClickEdit={() => {
                    setEditMode(true);
                }}
                isFlat={true}
                showDetailsFirst={true}
                onClickAddRoomie={() => {
                    navigation.navigate('AddRoomie', 'profile');
                }}
            />
        );
    }
};
export default FlatProfile;
