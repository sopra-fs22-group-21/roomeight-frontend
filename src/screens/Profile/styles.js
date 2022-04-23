import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    overview: {
        flex: 0.6,
        backgroundColor: colors.secondary200,
        padding: 6,
        marginTop: 5,
        marginBottom: 10,
        height: '40%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderRadius: 5,
        opacity: 0.5,
        flexDirection: 'row',
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
        paddingBottom: 0,
        marginTop: 40,
        marginBottom: 0,
        height: '100%',
    },

    text: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 16,
        alignContent: 'center',
        color: 'black',
        marginBottom: 20,
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
        backgroundColor: '#0E7490',
        height: 2,
        width: '50%',
        marginBottom: 0,
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 0,
        height: '100%',
    },
    scrolling: {
        backgroundColor: '#e7e5e4',
        padding: 10,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderRadius: 5,
        opacity: 0.5,
    },
});
export default styles;
