import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column1: {
        paddingRight: 0,
        flex: 1,
        //flexShrink: 1,
    },
    column2: {
        paddingLeft: -20,
        paddingTop: 5,
        paddingRight: 10,
        flex: 1,
        transform: [
            {
                translateX: 20,
            },
        ],
    },
    icon: {
        flex: 0,
        color: colors.red,
    },
    card: {
        flex: 1,
        overflow: 'scroll',
    },
    text: {
        fontSize: 15,
        paddingBottom: 4,
    },
    liked: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 15,
        paddingLeft: 3,
    },
    genderIcon: {
        fontSize: 15,
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 2,
    },
    image: {
        borderRadius: 20,
        aspectRatio: null,
        flex: 1,
        width: '100%',
        padding: 0,
        borderColor: 'transparent',
        //flexShrink: 1,
    },
    tags: {
        paddingLeft: 0,
        marginTop: 0,
    },
    editbutton: {
        position: 'absolute',
        width: '90%',
        bottom: 0,
        textAlign: 'center',
        alignSelf: 'center',
    },
    paginationContainer: {
        paddingTop: 20,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
    },
    paginationDots: {
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    preMatch: {
        borderWidth: 8,
        borderColor: colors.primaryShadow,
    },
    /* messageButton: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
    }, */
});

export default styles;
