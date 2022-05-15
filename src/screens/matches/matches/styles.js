import { StyleSheet } from 'react-native';
import colors from '../../../resources/colors';

const styles = StyleSheet.create({
    tab: {
        bottom: 1,
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
    },
    indicator: {
        backgroundColor: colors.primary600,
        height: 3,
    },
    heading: {
        fontSize: 30,
        lineHeight: 35,
        alignSelf: 'center',
    },
});
export default styles;
