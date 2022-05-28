import { StyleSheet } from 'react-native';
import colors from '../../resources/colors';
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
        backgroundColor: colors.primary700,
    },
    icon: {
        paddingLeft: 3,
    },
    disabled: {
        backgroundColor: colors.secondary300,
    },
    pressed: {
        backgroundColor: colors.primary600,
    },
});

export default styles;
