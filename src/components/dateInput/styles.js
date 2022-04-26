import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: '#e7e5e4',
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
    },
    day: {
        width: '22%',
    },
    month: {
        width: '22%',
    },
    year: {
        width: '50%',
    },
    error: {
        backgroundColor: '#fce6e6',
    },
    valid: {
        backgroundColor: '#e9f2ef',
    },
});

export default styles;
