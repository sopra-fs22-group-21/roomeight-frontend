import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    backgroundProfile: {
        backgroundColor: '#FDA4AF',
        borderRadius: 120,
        width: 120,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderProfile: {
        letterSpacing: 4,
        marginRight: -4,
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
