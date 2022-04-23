import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    image: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
    },
    name: {
        alignItems: 'center',
    },
    swiper: {
        flex: 1,
        borderRadius: 20,
    },
    pink: {
        flex: 1,
        // flex: 0.8,
    },
    text: {
        color: 'white',
    },
    smaller: {
        fontSize: 14,
    },
    description: {
        position: 'absolute',
        bottom: 0,
        padding: 20,
    },
});

export default styles;
