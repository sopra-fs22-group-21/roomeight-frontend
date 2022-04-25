import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import tagIcons from '../../resources/icons/tagIcons';
import {
    Container,
    Name,
    Screen,
    Heading,
    Title,
    Box,
} from '../../components/theme';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, InputLabel, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import DateInput from '../../components/dateInput';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import flatprofiles from '../../resources/flatprofiles';
import { SingleDetailCard } from '../../components/singleDetailCard';
import dateFormat from 'dateformat';

const FlatProfile = (props) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [image, setImage] = useState(userprofile.pictureReference[0]);

    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [description, setDescription] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [nrRoommates, setNrRoommates] = useState(null);
    const [nrBathrooms, setNrBathrooms] = useState(null);
    let selectedTagsFlat = [];
    const initialProfiles = flatprofiles;
    const [editMode, setEditMode] = useState(false);

    function changeToTemporary() {
        setTemporary(true);
        setPermanent(false);
    }

    function changeToPermanent() {
        setTemporary(false);
        setPermanent(true);
    }

    const selectedTags = tagIcons.filter((tag) =>
        userprofile.tags.includes(tag.name)
    );

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
                        <Input
                            label={en.completeFlatProfile.address}
                            //defaultValue={initialProfiles.address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        <DateInput
                            label={en.completeFlatProfile.moveInDate}
                            valid={moveInDateValid}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: date,
                                    });
                                setmoveInDateValid(valid);
                            }}
                        />
                        <Box style={styles.box}>
                            <CheckBox
                                containerStyle={styles.choice}
                                wrapperStyle={styles.wrapper}
                                textStyle={styles.text}
                                title={'Temporary'}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                color="#0E7490"
                                checked={temporary}
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
                                checked={permanent}
                                onPress={() => changeToPermanent()}
                            ></CheckBox>
                        </Box>
                        <Input
                            label={en.completeFlatProfile.rent}
                            keyboardType="number-pad"
                            placeholder="CHF"
                            onChangeText={(text) => setRent(text)}
                        />
                        <Input
                            label={en.completeFlatProfile.roomSize}
                            keyboardType="number-pad"
                            placeholder="m2"
                            onChangeText={(text) => setRoomSize(text)}
                        />
                        <InputBox label={en.completeFlatProfile.tags}>
                            <Tags
                                selected={selectedTags}
                                preSelected={userprofile.tags}
                                onChange={(tags) => console.log(tags)}
                            />
                        </InputBox>
                        <Input
                            label={en.completeFlatProfile.nrRoommates}
                            keyboardType="number-pad"
                            onChangeText={(text) => setNrRoommates(text)}
                        />
                        <Input
                            label={en.completeFlatProfile.nrBathrooms}
                            keyboardType="number-pad"
                            onChangeText={(text) => setNrBathrooms(text)}
                        />
                        <Input
                            label={en.completePersonalProfile.description}
                            multiline
                            onChangeText={(text) =>
                                setDescription({
                                    ...description,
                                    description: text,
                                })
                            }
                        />
                        <PrimaryButton
                            onPress={() => setEditMode(false)} /* {
                                    dispatch(updateUserprofile(user));
                                    console.log('putting');
                                    console.log(error);
                                    console.log(userprofile);
                                } */
                        >
                            Save
                        </PrimaryButton>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    } else {
        return (
            <SingleDetailCard
                userprofile={userprofile}
                onClickEdit={() => {
                    setEditMode(true);
                    console.log(editMode);
                }}
            />
        );
    }
};
export default FlatProfile;
