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
        marginTop: 50,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    box: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        padding: 2,
        height: 200,
        marginTop: 100,
    },
});

export default styles;
