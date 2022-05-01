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
    active: {
        backgroundColor: 'white',
        borderRadius: 1000,
        width: '50%',
        height: 50,
        position: 'absolute',
        bottom: -41,
        //left: '10%',
        transform: [{ scaleY: 0.3 }],
    },
    pressable: {
        flex: 1,
        alignItems: 'center',
    },
});

export default styles;
