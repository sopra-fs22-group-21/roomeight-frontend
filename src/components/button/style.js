import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    button: {
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'SourceSans3Regular',
        fontSize: 18,
    },
    primary: {
        borderRadius: 20,
        backgroundColor: '#0E7490',
    },
    primaryPressed: {
        backgroundColor: '#0c6076',
    },
    primaryDisabled: {
        backgroundColor: '#b0c8cf',
    },
    primaryLabel: {
        color: 'white',
    },
    secondary: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#F9A8D4',
        backgroundColor: 'white',
    },
    secondaryPressed: {
        backgroundColor: '#F9A8D4',
    },
    secondaryLabel: {
        color: '#F9A8D4',
    },
    secondaryPressedLabel: {
        color: 'white',
    },
});

export default styles;
