import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'SourceSans3Bold',
        fontSize: 42,
        lineHeight: 45,
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
        backgroundColor: '#fff',
        padding: 40,
        marginTop: 40,
        height: '100%',
        maxHeight: 1000,
        maxWidth: 700,
        alignSelf: 'center',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
});

export default styles;
