import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';

const styles = StyleSheet.create({
    backgroundProfile: {
        backgroundColor: colors.secondary300,
        borderRadius: 120,
        width: 120,
        aspectRatio: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderProfile: {
        letterSpacing: 4,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
        textAlign: 'center',
    },
    imageProfile: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 100,
    },
});
export default styles;
