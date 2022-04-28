import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Name, Box } from '../../components/theme';
import styles from './styles';
import { chatMemberShipListener } from '../../redux/actions/chatActions';
import SingleProfile from '../../components/singleProfile';
import FlatProfile from '../../components/flatProfile';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import AddFlatInProfile from '../../components/addFlatInProfile';

const Profile = ({ navigation }) => {
    useEffect(() => {
        dispatch(chatMemberShipListener());
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(userprofile.pictureReferences[0]);

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
                        size: 18,
                    }}
                />
                <Tab.Item
                    containerStyle={styles.tab}
                    icon={{
                        name: 'house',
                        type: 'material-icons',
                        color: 'black',
                        size: 24,
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

export default Profile;

//This was a overview of the profile, that we decided to delete
{
    /* <Box style={styles.overview}>
                <PictureInput
                    style={styles.image}
                    onPressDelete={() => {
                        setImage('');
                    }}
                    variant="profile"
                    image={image}
                    //initials={getInitials()}
                    onPressSelect={async () => {
                        const uri = await pickImage();
                        setImage(uri);
                    }}
                />
                <Container style={styles.bio}>
                    <Text style={styles.text} multiline>
                        {userprofile.biography}
                    </Text>
                </Container>
            </Box> */
}
