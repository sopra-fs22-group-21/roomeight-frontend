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
import { ScreenContainer } from '../../components/screenContainer';
import { View } from 'react-native-animatable';

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const loading = useSelector((state) => state.loadingState);
    const [index, setIndex] = useState(0);

    if (!loading) {
        console.log('loading: ' + loading);
        console.log(userprofile);
    }
    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <View>
                <Text style={styles.name}>
                    {userprofile.firstName + ' ' + userprofile.lastName}
                </Text>

                <Pressable
                    onPress={() => navigation.navigate('Settings')}
                    style={styles.icon}
                >
                    <Icon
                        name="settings"
                        type="feather"
                        size={24}
                        color={'black'}
                    />
                </Pressable>
            </View>
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
            ) : flatprofile.profileId ? (
                <FlatProfile />
            ) : (
                <AddFlatInProfile navigation={navigation} />
            )}
            <Box />
        </ScreenContainer>
    );
};

export default Profile;
