import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        borderRadius: 20,
        height: '100%',
        width: '100%',
        aspectRatio: null,
    },
    gradientContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        height: '50%',
        width: '100%',
        borderRadius: 20,
    },
});

export default styles;
