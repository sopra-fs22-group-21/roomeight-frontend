import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column1: {
        paddingRight: 10,
        width: '45%',
    },
    column2: {
        paddingLeft: 10,
        paddingTop: 10,
        width: '45%',
    },
    column3: {
        width: '10%',
    },
    card: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        paddingBottom: 4,
    },
    image: {
        borderRadius: 20,
        aspectRatio: 1,
        width: '100%',
        borderColor: 'transparent',
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
    icon: {
        right: 0,
        width: '100%',
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
