import { useRoute } from '@react-navigation/native';
import { React } from 'react';
import { FontAwesome, Ionicons } from 'react-native-vector-icons';
import { Box, Container } from '../theme';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../../resources/colors';
import { Pressable, View } from 'react-native';
import { Icon as Icon } from 'react-native-elements/dist/icons/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
const NavBar = ({ navigation }, props) => {
    const route = useRoute().name;

    const discoverIcon = (
        <Icon style={styles.icon} name="search" size={28} color={'white'} />
    );

    const matchesIcon = (
        <Icon
            style={styles.icon}
            name="favorite-outline"
            size={28}
            color={'white'}
        />
    );

    const chatIcon = (
        <Icon
            style={styles.icon}
            name="chat-outline"
            size={28}
            type="material-community"
            color={'white'}
        />
    );

    const profileIcon = (
        <Icon
            style={styles.icon}
            name="person-outline"
            size={28}
            color={'white'}
        />
    );
    const active = <View style={styles.active} />;
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Pressable onPress={() => navigation.navigate('Discover')}>
                {discoverIcon}
                {route.includes('Discover') ? active : null}
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Matches')}>
                {matchesIcon}
                {route === 'Matches' ? active : null}
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Chat')}>
                {chatIcon}
                {route === 'Chat' ? active : null}
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                {profileIcon}
                {route === 'Profile' ? active : null}
            </Pressable>
        </View>
    );
};
export default NavBar;
