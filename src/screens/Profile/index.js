import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { ProfilePicture } from '../../components/profilePicture';
import { Container, Name, Box } from '../../components/theme';
import { logoutUser } from '../../redux/actions/authActions';
import { getCurrentUserprofile } from '../../redux/actions/getUserprofiles';
import styles from './styles';
import { ScrollView } from 'react-native';
import { InputLabel } from '../../components/input';
import en from '../../resources/strings/en.json';
import Tags from '../../components/tags';
import modes from '../../resources/strings/modes';

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);
    /*     const [mode, setMode] = useState(modes.single);
    const modeOptions = [modes.single, modes.flat]; */

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
                <Container style={styles.container}>
                    <ScrollView>
                        <Box style={styles.scrolling}>
                            <InputLabel>Address</InputLabel>
                            <InputLabel>
                                {en.singleProfile.description}
                            </InputLabel>
                            <Text style={styles.text}>
                                {userprofile.description}
                            </Text>
                            <InputLabel>{en.singleProfile.tags}</InputLabel>
                            <Tags />
                        </Box>

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
                    </ScrollView>
                </Container>
            ) : (
                <Container style={styles.container}>
                    <ScrollView>
                        <Box style={styles.scrolling}>
                            <InputLabel>{en.flatProfile.moveIn}</InputLabel>
                            <Text style={styles.text}>
                                {userprofile.moveInDate}
                                {userprofile.moveOutDate}
                            </Text>
                            <InputLabel>
                                {en.singleProfile.description}
                            </InputLabel>
                            <Text style={styles.text}>
                                {userprofile.description}
                            </Text>
                            <InputLabel>{en.singleProfile.tags}</InputLabel>
                            <Tags />
                        </Box>
                    </ScrollView>
                </Container>
            )}
        </Container>
    );
};

export default Profile;
