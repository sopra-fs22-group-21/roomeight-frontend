import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';

const RADIUS = 11;
const styles = StyleSheet.create({
    row: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        width: 40,
        textAlign: 'center',
    },
    thumb: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS,
        borderWidth: 3,
        borderColor: '#bfbfbf',
        backgroundColor: 'white',
    },
    rail: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#bfbfbf',
    },
    selected: {
        height: 4,
        backgroundColor: colors.primary500,
    },
});

export default styles;
