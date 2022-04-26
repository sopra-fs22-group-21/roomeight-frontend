import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Name, Box } from '../../components/theme';
import PictureInput from '../../components/pictureInput';
import styles from './styles';
import { chatMemberShipListener } from '../../redux/actions/chatActions';
import { PickImage } from '../../helper/imageHandler';
import SingleProfile from '../../components/singleProfile';
import FlatProfile from '../../components/flatProfile';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
        dispatch(chatMemberShipListener());
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(userprofile.images[0]);

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
            {index === 0 ? <SingleProfile /> : <FlatProfile />}
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
