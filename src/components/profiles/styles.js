import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    avatar: {
        marginRight: 15,
        borderRadius: 10,
        width: 40,
        padding: 0,
    },
    expandedAvatar: {
        aspectRatio: null,
        height: 100,
        marginRight: 5,
        borderRadius: 20,
        marginBottom: 5,
    },
    avatarText: {
        fontSize: 20,
    },

    gallery: {
        paddingBottom: 10,
        paddingTop: 5,
    },
    rightSide: {
        flex: 1,
    },
    smaller: {
        fontSize: 14,
    },
    profile: {
        padding: 5,
        backgroundColor: colors.secondary200,
        borderRadius: 10,
        //borderColor: colors.secondary300,
        //borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
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
        flex: 0,
        color: colors.red,
    },
    row: {
        flexDirection: 'row',
    },
    liked: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 15,
        paddingLeft: 3,
        paddingRight: 5,
    },
});

export default styles;
