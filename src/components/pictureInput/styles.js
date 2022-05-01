import { StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const styles = StyleSheet.create({
    backgroundProfile: {
        backgroundColor: Colors.secondary300,
        display: 'flex',
        borderRadius: 100,
        width: 120,
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
    backgroundAdditional: {
        backgroundColor: Colors.secondary300,
        display: 'flex',
        borderRadius: 20,
        height: 150,
        aspectRatio: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderAdditional: {
        letterSpacing: 5,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
    },
    imageAdditional: {
        height: 150,
        aspectRatio: 0.7,
        borderRadius: 20,
    },
    editprofile: {
        height: 200,
        aspectRatio: 1.4,
        borderRadius: 20,
    },
    backgroundEditprofile: {
        backgroundColor: Colors.secondary300,
        display: 'flex',
        borderRadius: 20,
        height: 200,
        aspectRatio: 1.4,
    },
    placeholderEdit: {
        letterSpacing: 5,
        fontSize: 40,
        fontFamily: 'SourceSans3Light',
    },
});

export default styles;
