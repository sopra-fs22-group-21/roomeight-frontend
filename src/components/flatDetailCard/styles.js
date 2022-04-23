import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    name: {
        alignItems: 'center',
    },
    column: {
        width: '50%',
    },
    column1: {
        paddingRight: 10,
    },
    column2: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    text: {
        fontSize: 14,
        paddingBottom: 4,
    },
    image: {
        borderRadius: 20,
        aspectRatio: null,
        minHeight: 150,
        width: '100%',
        borderColor: 'transparent',
    },
    tags: {
        paddingLeft: 0,
    },
    avatar: {
        width: 40,
        marginRight: 15,
    },
    avatarText: {
        fontSize: 15,
    },
    roomie: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomieName: {
        fontSize: 20,
        fontFamily: 'SourceSans3SemiBold',
        lineHeight: 30,
    },
    paginationContainer: {
        paddingBottom: 0,
        paddingTop: 20,
    },
    paginationDots: {
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default styles;
