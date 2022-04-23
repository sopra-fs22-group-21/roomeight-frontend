import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { ProfilePicture } from '../../components/profilePicture';
import {
    Container,
    Name,
    Screen,
    Heading,
    Title,
    Box,
} from '../../components/theme';
import { logoutUser } from '../../redux/actions/authActions';
import { getCurrentUserprofile } from '../../redux/actions/getUserprofiles';
import styles from './styles';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputBox, InputLabel, Input } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import modes from '../../resources/strings/modes';
import DateInput from '../../components/dateInput';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);
    const [moveInDateValidSingle, setmoveInDateValidSingle] = useState(
        userprofile.moveInDate
    );
    const [biography, setBiography] = useState(userprofile.biography);
    const [descriptionSingle, setDescriptionSingle] = useState(null);
    let selectedTagsSingle = [];

    const [moveInDateValidFlat, setmoveInDateValid] = useState(null);
    const [descriptionFlat, setDescriptionFlat] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [nrRoommates, setNrRoommates] = useState(null);
    const [nrBathrooms, setNrBathrooms] = useState(null);
    let selectedTagsFlat = [];

    function changeToTemporary() {
        setTemporary(true);
        setPermanent(false);
    }

    function changeToPermanent() {
        setTemporary(false);
        setPermanent(true);
    }

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    return (
        <Container
            style={styles.biocontainer}
            navigation={navigation}
            showNavBar
        >
            <Name>{userprofile.firstName + ' ' + userprofile.lastName}</Name>
            <Box style={styles.overview}>
                <ProfilePicture />
                <Container style={styles.bio}>
                    <Text style={styles.text}>{userprofile.biography}</Text>
                </Container>
            </Box>
            <Tab
                value={index}
                onChange={(e) => {
                    setIndex(e);
                }}
                indicatorStyle={styles.indicator}
                variant="primary"
            >
                <Tab.Item
                    containerStyle={styles.tab}
                    icon={{
                        name: 'user-alt',
                        type: 'font-awesome-5',
                        color: 'black',
                        size: 12,
                    }}
                />
                <Tab.Item
                    containerStyle={styles.tab}
                    icon={{
                        name: 'groups',
                        type: 'material-icons',
                        color: 'black',
                        size: 25,
                    }}
                />
            </Tab>
            {index === 0 ? (
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={styles.inner}
                        behavior="padding"
                    >
                        <View>
                            <DateInput
                                label={en.completeSingleProfile.moveInDate}
                                valid={moveInDateValidSingle}
                                onChange={(date, valid) => {
                                    if (valid)
                                        setUser({
                                            ...user,
                                            moveInDate: dateFormat(
                                                date,
                                                'yyyy-mm-dd'
                                            ),
                                        });
                                    setmoveInDateValidSingle(
                                        valid && date > new Date()
                                    );
                                }}
                            />

                            <InputBox label={'Tags'}>
                                <Tags onChange={(tags) => console.log(tags)} />
                            </InputBox>
                            <Input
                                label={en.addProfilePicture.biography}
                                placeholder={userprofile.biography}
                                multiline
                                onChangeText={(text) =>
                                    setBiography({
                                        ...biography,
                                        biography: text,
                                    })
                                }
                            />
                            <Input
                                label={en.addProfilePicture.description}
                                placeholder={userprofile.description}
                                multiline
                                onChangeText={(text) =>
                                    setDescriptionSingle({
                                        ...descriptionSingle,
                                        descriptionSingle: text,
                                    })
                                }
                            />
                        </View>

                        {/* <PrimaryButton
                        onPress={() => {
                            dispatch(logoutUser());
                        }}
                    >
                        Logout
                    </PrimaryButton>
                    <PrimaryButton
                        onPress={() => {
                            dispatch(getCurrentUserprofile(auth.uid));
                        }}
                    >
                        get
                    </PrimaryButton> */}
                    </KeyboardAwareScrollView>
                </View>
            ) : (
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={styles.inner}
                        behavior="padding"
                    >
                        <View>
                            <Input
                                label={en.completeFlatProfile.address}
                                onChangeText={(text) => setAddress(text)}
                            />
                            <DateInput
                                label={en.completeFlatProfile.moveInDate}
                                valid={moveInDateValidSingle}
                                onChange={(date, valid) => {
                                    if (valid)
                                        setUser({
                                            ...user,
                                            moveInDate: dateFormat(
                                                date,
                                                'yyyy-mm-dd'
                                            ),
                                        });
                                    setmoveInDateValidSingle(valid);
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
                                <Tags onChange={(tags) => console.log(tags)} />
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
                                label={en.addProfilePicture.description}
                                multiline
                                onChangeText={(text) =>
                                    setDescriptionFlat({
                                        ...descriptionFlat,
                                        descriptionFlat: text,
                                    })
                                }
                            />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )}
        </Container>
    );
};

export default Profile;
