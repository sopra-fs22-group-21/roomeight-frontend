import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.secondary300,
        display: 'flex',
        borderRadius: 100,
        width: 120,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        letterSpacing: 5,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
    },
    image: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 100,
    },
    backgroundAdditional: {
        backgroundColor: Colors.secondary300,
        display: 'flex',
        borderRadius: 20,
        height: 150,
        aspectRatio: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderAdditional: {
        letterSpacing: 5,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
    },
    imageAdditional: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 100,
    },
});

export default styles;
