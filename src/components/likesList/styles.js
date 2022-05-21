import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    profilePicture: {
        height: 50,
        width: 50,
        marginRight: 4,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontFamily: 'SourceSans3SemiBold',
        lineHeight: 30,
    },
    row: {
        flexDirection: 'row',
    },
    icon: {
        flex: 0,
        color: colors.secondary400,
        paddingRight: 4,
    },
    liked: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 15,
        paddingLeft: 3,
    },
});

export default styles;
