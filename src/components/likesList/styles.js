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
    icon: {
        paddingRight: 4,
    },
});

export default styles;
