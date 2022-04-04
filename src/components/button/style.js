import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    primary: {
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        backgroundColor: '#0c6076',
    },
    unpressed: {
        backgroundColor: '#0E7490',
    },
    disabled: {
        backgroundColor: '#b0c8cf',
    },
    label: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 18,
        color: 'white',
    },
});

export default styles;
