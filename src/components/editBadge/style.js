import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    background: {
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
});

export default styles;
