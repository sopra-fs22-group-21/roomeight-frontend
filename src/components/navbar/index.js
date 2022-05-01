import { useRoute } from '@react-navigation/native';
import { React } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import styles from './styles';
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
            <Pressable
                onPress={() => navigation.navigate('Discover')}
                style={styles.pressable}
            >
                {discoverIcon}
                {route.includes('Discover') ? active : null}
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Matches')}
                style={styles.pressable}
            >
                {matchesIcon}
                {route.includes('Match') ? active : null}
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Chat')}
                style={styles.pressable}
            >
                {chatIcon}
                {route.includes('Chat') ? active : null}
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={styles.pressable}
            >
                {profileIcon}
                {route.includes('Profile') ? active : null}
            </Pressable>
        </View>
    );
};
export default NavBar;
