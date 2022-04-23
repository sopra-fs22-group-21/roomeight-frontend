import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 42,
        lineHeight: 50,
        color: '#404040', //true gray,
    },
    smallHeading: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 34,
        lineHeight: 50,
        color: '#404040', //true gray,
    },
    title: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 26,
        lineHeight: 30,
        color: '#404040',
    },
    text: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 18,
        color: 'black',
    },
    textBox: {
        paddingBottom: 20,
    },
    semiBold: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 22,
        lineHeight: 30,
        color: '#404040',
    },
    padding: {
        padding: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
        marginTop: 60,
        height: '100%',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    screen: {
        flex: 1,
        padding: 0,
        height: '100%',
        minHeight: 100,
    },

    name: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 26,
        lineHeight: 30,
        color: '#404040',
        alignSelf: 'center',
    },
    label: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 18,
        lineHeight: 24,
    },
    pink: {
        backgroundColor: colors.secondary100,
        justifyContent: 'flex-start',
        borderRadius: 20,
        padding: 20,
        flex: 1,
    },
});

export default styles;
