import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    backgroundProfile: {
        marginLeft: 90,
        marginTop: -25,
        backgroundColor: Colors.secondary100,
        display: 'flex',
        borderRadius: 100,
        width: 25,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundAdditional: {
        marginLeft: 85,
        marginTop: -20,
        backgroundColor: Colors.secondary100,
        display: 'flex',
        borderRadius: 100,
        width: 25,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
