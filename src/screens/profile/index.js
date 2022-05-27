import { useState } from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native-animatable';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { useSelector } from 'react-redux';
import AddFlatInProfile from '../../components/addFlatInProfile';
import FlatProfile from '../../components/flatProfile';
import { ScreenContainer } from '../../components/screenContainer';
import SingleProfile from '../../components/singleProfile';
import { Box, SmallHeading } from '../../components/theme';
import styles from './styles';

const Profile = ({ navigation }) => {
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [index, setIndex] = useState(userprofile.isAdvertisingRoom ? 1 : 0);

    return (
        <ScreenContainer navigation={navigation} showNavBar>
            <View>
                <SmallHeading style={styles.name}>
                    {userprofile.firstName + ' ' + userprofile.lastName}
                </SmallHeading>

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
                <FlatProfile navigation={navigation} />
            ) : (
                <AddFlatInProfile navigation={navigation} />
            )}
            <Box />
        </ScreenContainer>
    );
};

export default Profile;
