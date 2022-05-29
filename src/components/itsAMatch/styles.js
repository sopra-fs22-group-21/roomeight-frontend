import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
    },
    inner: {
        justifyContent: 'center',
        height: '100%',
        top: 0,
    },
    pressable: {
        position: 'absolute',
        height: '60%',
        width: '60%',
        alignSelf: 'center',
    },
    image: {
        position: 'absolute',
        aspectRatio: 1,
        height: '30%',
        width: '60%',
        alignSelf: 'center',
        borderRadius: 0,
    },
    heartOverlay: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    heading: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: (Dimensions.get('window').height * 3) / 4,
    },
    button: {
        position: 'absolute',
        alignSelf: 'center',
        width: '60%',
        bottom: Dimensions.get('window').height / 4,
    },
    close: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
});

export default styles;
