import { StyleSheet } from 'react-native';
import colors from '../../../resources/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 40,
        marginTop: 40,
        height: '100%',
    },
    inner: {
        flex: 1,
        paddingBottom: 40,
    },
    error: {
        color: colors.secondary600,
    },
});

export default styles;
