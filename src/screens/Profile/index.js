import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import {
    Container,
    Name,
    Screen,
    Heading,
    Title,
    Box,
} from '../../components/theme';
import PictureInput from '../../components/pictureInput';
import styles from './styles';
import { InputBox, Input } from '../../components/input';
import {
    chatMemberShipListener,
    chatInfoListener,
} from '../../redux/actions/chatActions';
import { ScrollView } from 'react-native';
import en from '../../resources/strings/en.json';
import { PickImage } from '../../helper/imageHandler';
import { updateUserprofile } from '../../redux/actions/updateUserprofile';
import flatprofiles from '../../resources/flatprofiles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
        dispatch(chatMemberShipListener());
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);
    //const [image, setImage] = useState(userprofile.pictureReference[0]);

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
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <Icon
                    style={styles.icon}
                    name="settings"
                    type="feather"
                    size={24}
                    color={'black'}
                />
            </Pressable>
            <Name>{userprofile.firstName + ' ' + userprofile.lastName}</Name>
            {/* <Box style={styles.overview}>
                <PictureInput
                    style={styles.image}
                    onPressDelete={() => {
                        setImage('');
                    }}
                    variant="profile"
                    image={image}
                    //initials={getInitials()}
                    onPressSelect={async () => {
                        const uri = await PickImage();
                        setImage(uri);
                    }}
                />
                <Container style={styles.bio}>
                    <Text style={styles.text} multiline>
                        {userprofile.biography}
                    </Text>
                </Container>
            </Box> */}
            <Tab
                value={index}
                onChange={(e) => {
                    setIndex(e);
                }}
                indicatorStyle={styles.indicator}
                variant="default"
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
            <Box />
            {index === 0 ? (
                <SingleProfile />
            ) : userprofile.isAdvertisingRoom ? (
                <FlatProfile />
            ) : (
                <AddFlatInProfile />
            )}
            <Box />
        </Container>
    );
};

/* <PrimaryButton
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
                    </PrimaryButton> */

export default Profile;
