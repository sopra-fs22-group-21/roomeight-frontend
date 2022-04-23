import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    overview: {
        backgroundColor: colors.secondary100,
        padding: 5,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderRadius: 5,
        //opacity: 0.5,
        flexDirection: 'row',
        height: 130,
    },

    bio: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
    },
    biocontainer: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 10,
        marginTop: 40,
        marginBottom: 0,
        height: '100%',
    },

    text: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
        lineHeight: 24,
    },
    tab: {
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    indicator: {
        backgroundColor: colors.primary600,
        height: 2,
        width: '50%',
        marginBottom: 0,
    },
    container: {
        flex: 1,
        padding: 0,
        marginTop: 20,
        paddingTop: 0,
        marginBottom: 60,
        height: '100%',
    },
    inner: {
        flex: 1,
    },
    box: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 2,
        height: '100%',
    },
    choice: {
        backgroundColor: 'white',
        borderColor: 'white',
        height: '100%',
        width: '50%',
    },
});
export default styles;
