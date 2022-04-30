import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        backgroundColor: colors.primary700,
        overflow: 'hidden',
        //transform: [{translateY: 10}]
    },
    view: {
        padding: 0,
        backgroundColor: colors.primary700,
        opacity: 0.7,
    },
    active: {
        backgroundColor: 'white',
        borderRadius: 1000,
        width: '160%',
        height: 50,
        position: 'absolute',
        bottom: -40,
        left: '-30%',
        transform: [{ scaleY: 0.3 }],
    },
});

export default styles;
