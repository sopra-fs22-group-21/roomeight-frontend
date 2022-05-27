import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
        height: '100%',
    },
    inner: {
        flex: 1,
        //paddingBottom: 70,
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
    blue: {
        color: '#0E7490',
    },
    text: {
        fontFamily: 'SourceSans3SemiBold',
        fontSize: 16,
        lineHeight: 24,
    },
});

export default styles;
