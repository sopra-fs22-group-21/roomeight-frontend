import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { ProfilePicture } from '../../components/pictureRender';
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

const Profile = ({ navigation }) => {
    useEffect(() => {
        console.log('render');
    }, []);

    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    return (
        <Screen navigation={navigation} showFooter>
            <Container>
                <Name>
                    {userprofile.firstName + ' ' + userprofile.lastName}
                </Name>
                <Box style={styles.overview}>
                    <ProfilePicture />
                    <Container style={styles.bio}>
                        <Text style={styles.text}>Hello friends </Text>
                    </Container>
                </Box>
                <Tab
                    value={index}
                    onChange={(e) => setIndex(e)}
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

                <PrimaryButton
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
                </PrimaryButton>
            </Container>
        </Screen>
    );
};

export default Profile;
