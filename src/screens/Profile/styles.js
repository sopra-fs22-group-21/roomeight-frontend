import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    overview: {
        flex: 0.6,
        backgroundColor: '#FBCFE8',
        padding: 6,
        marginTop: 5,
        marginBottom: 10,
        height: '2%',
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
    },

    text: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 20,
        alignContent: 'center',
    },
    tab: {
        backgroundColor: 'transparent',
        paddingBottom: 2,
        paddingTop: 0,
        margin: 0,
    },
    indicator: {
        backgroundColor: '#0E7490',
        height: 2,
        width: '50%',
    },
});
export default styles;
