import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    profilePicture: {
        height: 10,
        width: 10,
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
});

export default styles;
