import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
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
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    tags: {
        paddingLeft: 0,
    },
    editbutton: {
        marginTop: 20,
        marginBottom: 5,
        alignContent: 'flex-end',
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
