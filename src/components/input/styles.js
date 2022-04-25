import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#e7e5e4',
        //height: 30,
        padding: 10,
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        borderRadius: 4,
    },
    error: {
        backgroundColor: '#f2e9ec',
    },
    valid: {
        backgroundColor: '#e9f2ef',
    },
});

export default styles;
