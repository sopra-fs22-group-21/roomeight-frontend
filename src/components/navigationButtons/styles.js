import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    backButton: {
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 100,
        width: 40,
        height: 40,
    },
    nextButton: {
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: '#0E7490',
    },
    icon: {
        paddingLeft: 3,
    },
    disabled: {
        backgroundColor: '#b0c8cf',
    },
    pressed: {
        backgroundColor: '#0c6076',
    },
});

export default styles;
