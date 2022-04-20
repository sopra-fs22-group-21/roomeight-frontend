import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    backgroundProfile: {
        backgroundColor: '#FDA4AF',
        display: 'flex',
        borderRadius: 100,
        width: 100,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderProfile: {
        letterSpacing: 5,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
    },
    imageProfile: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 100,
    },
});
export default styles;
